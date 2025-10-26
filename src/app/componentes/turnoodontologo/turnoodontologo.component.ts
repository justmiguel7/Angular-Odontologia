import { AuthService } from '../../service/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TurnoOdontologoService } from '../../service/turnoodontologo.service';
import { Turno } from '../../modelo/Turno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turno-odontologo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TurnoOdontologoService],
  templateUrl: './turnoodontologo.component.html',
  styleUrl: './turnoodontologo.component.css'
})
export class TurnoOdontologoComponent {


  turno: Turno = new Turno('', '', new Date(), 'PENDIENTE');
  minFecha: string = '';

  constructor(private turnoService: TurnoOdontologoService, private http: HttpClient, private authService: AuthService) {}

ngOnInit() {
  // Fecha mínima: una semana a partir de hoy
  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 7);
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  this.minFecha = hoy.toISOString().slice(0,16);

  // Obtener DNI automáticamente del token
  const dni = this.authService.getDni();
  if (dni) {
    this.turno.dniodontologo = dni;
  }
}

  reservarTurno() {
    // 🔹 Mostrar loader
    Swal.fire({
      title: 'Reservando turno...',
      text: 'Por favor espera mientras enviamos el correo.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // 🔹 Llamar al servicio
    this.turnoService.agregarTurnoOdontologo(this.turno).subscribe({
      next: () => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Turno reservado',
          text: 'Revisa tu correo electrónico.',
          confirmButtonColor: '#3085d6'
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

    // 🔸 Domingo
    if (dia === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Día no disponible',
        text: 'No se pueden reservar turnos los domingos.'
      });
      this.turno.fechaYHora = new Date();
      return;
    }

    // 🔸 Horario fuera de rango
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
