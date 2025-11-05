
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnoService } from '../../service/turno.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { OdontologoService } from '../../service/odontologo.service';

@Component({
  selector: 'app-confirmar-turno-recepcionista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmar-turno-recepcionista.component.html',
  styleUrl: './confirmar-turno-recepcionista.component.css',
  providers: [TurnoService]
})
export class ConfirmarTurnoRecepcionistaComponent implements OnInit{
  turnos: any[] = [];
  odontologos: any[] = [];
  form: any={
    dniodontologo:'',
  }

  constructor(private turnoService: TurnoService, private authService: AuthService, private odontologoService: OdontologoService) {}

  ngOnInit(): void {
    this.listarTurnos();
    this.listarOdontologos();
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

    listarOdontologos() {
    this.odontologoService.listarOdontologos().subscribe({
      next: (data) => {
        this.odontologos = data;
        console.log('✅ Odontologos cargados:', this.odontologos);
      },
      error: err => {
        console.error('Error al listar turnos:', err);
        Swal.fire('Error', 'No se pudieron cargar los turnos', 'error');
      }
    });
  }

  onOdontologoSeleccionado(){
    console.log('Odontolo seleccionado ID:', this.form.dniodontologo);
    const odontologo = this.odontologos.find(t => t.id == this.form.dniodontologo);
    console.log('Hola sebas:', odontologo);
  }

  confirmarTurno(turnoId: number) {
  const dniOdontologo = this.form.dniodontologo;
  if (!dniOdontologo) {
    Swal.fire('Error', 'No se pudo obtener el DNI del Odontologo', 'error');
    return;
  }

  console.log('🦷 Confirmando turno con odontólogo DNI:', dniOdontologo);

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

cancelarTurno(idTurno: number) {
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
          this.listarTurnos();
        },
        error: err => {
          Swal.close();
          Swal.fire('Error', err.error?.message || 'No se pudo cancelar el turno', 'error');
        }
      });
    }
  });
}

}
