
import { AuthService } from '../../service/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TurnoOdontologoService } from '../../service/turnoodontologo.service';
import { Turno } from '../../modelo/Turno';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turno-odontologo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TurnoOdontologoService],
  templateUrl: './turnoodontologo.component.html',
  styleUrls: ['./turnoodontologo.component.css']
})
export class TurnoOdontologoComponent {

  turno: Turno = new Turno('', '', null as any, 'PENDIENTE');
  minFecha: string = '';

  constructor(
    private turnoService: TurnoOdontologoService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 7);
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    this.minFecha = hoy.toISOString().slice(0,16);

    const dni = this.authService.getDni();
    if (dni) {
      this.turno.dniodontologo = dni;
    }
  }

  reservarTurno() {
    if (!this.turno.dnipaciente) {
    Swal.fire({
      icon: 'warning',
      title: 'DNI del paciente es requerido',
      text: 'Debe ingresar el DNI del paciente.',
      confirmButtonColor: '#f39c12'
    });
    return;
    }

    if (!this.turno.fechaYHora) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha y hora requeridas',
      text: 'Debe seleccionar una fecha y hora antes de reservar el turno.',
      confirmButtonColor: '#f39c12'
    });
    return;
    }

    Swal.fire({
      title: 'Reservando turno...',
      text: 'Por favor espera mientras enviamos el correo.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.turnoService.agregarTurnoOdontologo(this.turno).subscribe({
      next: () => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Turno reservado',
          text: 'Revisa tu correo electrónico.',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/home']);
        });
        this.turno = new Turno('', '', new Date(), 'PENDIENTE');
      },
      error: (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al reservar turno',
          text: err.error?.message || 'Ocurrió un error. Intenta nuevamente.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  validarFechaHora() {
    const fechaSeleccionada = new Date(this.turno.fechaYHora);
    const dia = fechaSeleccionada.getDay();
    const hora = fechaSeleccionada.getHours();

    if (dia === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Día no disponible',
        text: 'No se pueden reservar turnos los domingos.'
      });
      this.turno.fechaYHora = new Date();
      return;
    }

    if (hora < 9 || hora >= 17) {
      Swal.fire({
        icon: 'warning',
        title: 'Horario no disponible',
        text: 'Solo se pueden reservar turnos entre 9:00 y 17:00 hs.'
      });
      this.turno.fechaYHora = new Date();
      return;
    }
  }
}
