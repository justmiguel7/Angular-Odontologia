import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnoService } from '../../service/turno.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-confirmar-turno',
  standalone: true,
  templateUrl: './confirmar-turno.componente.html',
  styleUrls: ['./confirmar-turno.componente.css'],
  imports: [CommonModule, FormsModule],
  providers: [TurnoService]
})
export class ConfirmarTurnoComponent implements OnInit {
  turnos: any[] = [];

  constructor(private turnoService: TurnoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.listarTurnos();
  }

  listarTurnos() {
    this.turnoService.listarTurnos().subscribe({
      next: (data: any[]) => {
        this.turnos = data.filter(turno => turno.estado === 'PENDIENTE');
      },
      error: err => {
        console.error('Error al listar turnos:', err);
        Swal.fire('Error', 'No se pudieron cargar los turnos', 'error');
      }
    });
  }

confirmarTurno(turnoId: number) {
  const dniOdontologo = this.authService.getDni();
  if (!dniOdontologo) {
    Swal.fire('Error', 'No se pudo obtener tu DNI', 'error');
    return;
  }

  // ⚡ Mostrar carga
  Swal.fire({
    title: 'Confirmando turno...',
    didOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false
  });

  // ⚠️ Solo enviamos el dniOdontologo en el body
  this.turnoService.confirmarTurno(turnoId, dniOdontologo).subscribe({
    next: () => {
      Swal.close(); // cerramos el loading
      Swal.fire({
        icon: 'success',
        title: 'Turno confirmado',
        timer: 1500,
        showConfirmButton: false
      });
      this.listarTurnos();
    },
    error: err => {
      Swal.close(); // cerramos el loading aunque haya error
      Swal.fire('Error', err.error?.message || 'No se pudo confirmar el turno', 'error');
    }
  });
}
}
