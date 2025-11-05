
import { AuthService } from '../../service/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TurnoService } from '../../service/turnopaciente.service';
import { Turno } from '../../modelo/Turno';
import { Router } from '@angular/router'; // 🔹 import Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turno-paciente',
  standalone: true,
  templateUrl: './turnopaciente.component.html',
  styleUrls: ['./turnopaciente.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [TurnoService]
})
export class TurnoPacienteComponent {
  turno: Turno = new Turno('', '', null as any, 'PENDIENTE');
  minFecha: string = '';

  constructor(
    private turnoService: TurnoService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router // ✅ agregado
  ) {}

  ngOnInit() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 7);
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    this.minFecha = hoy.toISOString().slice(0,16);

    const dni = this.authService.getDni();
    if (dni) {
      this.turno.dnipaciente = dni;
    }
  }

  reservarTurno() {
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

    this.turnoService.agregarTurnoPaciente(this.turno).subscribe({
      next: () => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Turno reservado',
          text: 'Revisa tu correo electrónico.',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/home']); // ✅ redirige al home
        });
        this.turno = new Turno('', '', new Date(), 'PENDIENTE');
      },
      error: (err) => {
        Swal.close();

        const mensaje = err.error?.message || 'Ocurrió un error. Intenta nuevamente.';

        if (mensaje.includes('Ya existe un turno')) {
          Swal.fire({
            icon: 'warning',
            title: 'Turno no disponible',
            text: 'Ya existe un turno reservado para esa fecha y hora. Por favor elige otro horario.',
            confirmButtonColor: '#f39c12'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al reservar turno',
            text: mensaje,
            confirmButtonColor: '#d33'
          });
        }
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
