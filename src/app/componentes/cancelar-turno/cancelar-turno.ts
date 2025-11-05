import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ necesario para ngFor, ngClass, date pipe
import { TurnoService } from '../../service/turno.service';
import { Turno } from '../../modelo/Turno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancelar-turno',
  standalone: true,
  imports: [CommonModule], // ✅ agregalo acá
  templateUrl: './cancelar-turno.html',
  styleUrls: ['./cancelar-turno.css'],
  providers: [TurnoService]
})
export class CancelarTurno implements OnInit {
turnos: any[] = [];

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.listarTurnos();
  }

  listarTurnos(): void {
    this.turnoService.listarTurnos().subscribe({
      next: (datos: Turno[]) => {
        this.turnos = datos.map(turno => ({
          ...turno,
          fechaYHora: new Date(turno.fechaYHora)
        }));
        console.log('✅ Turnos cargados:', this.turnos);
      },
      error: (err: any) => {
        console.error('❌ Error al cargar turnos:', err);
        Swal.fire('Error', 'No se pudieron cargar los turnos', 'error');
      }
    });
  }

  cancelarTurno(idTurno: number): void {
    Swal.fire({
      title: '¿Cancelar turno?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cancelando turno...',
          didOpen: () => Swal.showLoading(),
          allowOutsideClick: false
        });

        this.turnoService.cancelarTurno(idTurno).subscribe({
          next: () => {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Turno cancelado correctamente',
              timer: 1500,
              showConfirmButton: false
            });

            this.turnos = this.turnos.map(t =>
              t.idturno === idTurno ? { ...t, estado: 'CANCELADO' } : t
            );
          },
          error: (err) => {
            Swal.close();
            Swal.fire('Error', err.error?.message || 'No se pudo cancelar el turno', 'error');
          }
        });
      }
    });
  }
}
