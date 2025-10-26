import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialClinicoService } from '../../service/historialclinico.service';
import { TratamientoService } from '../../service/tratamiento.service';
import { TurnoService } from '../../service/turno.service';
import { DetalleDentalService } from '../../service/detalle-dental.service';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-historial.html',
  styleUrls: ['./agregar-historial.css']
})
export class AgregarHistorial implements OnInit {  turnos: any[] = [];
  tratamientos: any[] = [];
  form: any = {
    idturno: '',
    idtratamiento: '',
    motivodeconsulta: '',
    diagnostico: '',
    observaciones: '',
    alergias: '',
    antecedentesmedicos: '',
    dientes: []
  };
  dniOdontologo: string = '';

  constructor(
    private historialService: HistorialClinicoService,
    private tratamientoService: TratamientoService,
    private turnoService: TurnoService,
    private detalleDentalService: DetalleDentalService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const dni = this.authService.getDni();
    if (dni) {
      this.dniOdontologo = dni;
      this.cargarTurnos();
      this.cargarTratamientos();
    }
  }

  cargarTurnos() {
    this.turnoService.listarPorDniOdontologo(this.dniOdontologo).subscribe({
      next: (data) => this.turnos = data.map(t => ({
        ...t,
        fechaYHora: new Date(t.fechaYHora)
      })),
      error: (err) => console.error('Error cargando turnos', err)
    });
  }

  cargarTratamientos() {
    this.tratamientoService.getTratamientos().subscribe({
      next: (data) => this.tratamientos = data,
      error: (err) => console.error('Error cargando tratamientos', err)
    });
  }

  agregarDiente() {
    this.form.dientes.push({
      dienteId: null,
      diagnostico: '',
      tratamiento: '',
      observaciones: ''
    });
  }

  eliminarDiente(i: number) {
    this.form.dientes.splice(i, 1);
  }
guardarHistorial() {
  const turnoSeleccionado = this.turnos.find(t => t.idturno == this.form.idturno);
  if (!turnoSeleccionado) {
    Swal.fire('Error', 'Debe seleccionar un turno válido', 'warning');
    return;
  }

  const historial = {
    dnipaciente: turnoSeleccionado.dnipaciente,
    dniodontologo: this.dniOdontologo,
    idturno: Number(this.form.idturno),           // convertir a número
    idtratamiento: Number(this.form.idtratamiento), // convertir a número
    motivodeconsulta: this.form.motivodeconsulta,
    fechadeconsulta: new Date().toISOString(),
    diagnostico: this.form.diagnostico,
    observaciones: this.form.observaciones,
    alergias: this.form.alergias,
    antecedentesmedicos: this.form.antecedentesmedicos
  };

  this.historialService.crearHistorial(historial).subscribe({
    next: () => {
      this.form.dientes.forEach((detalle: any) => {
        detalle.turnoId = Number(this.form.idturno);
        this.detalleDentalService.guardar(detalle).subscribe();
      });
      Swal.fire('Éxito', 'Historial clínico guardado correctamente', 'success');
      this.form = {
        idturno: '',
        idtratamiento: '',
        motivodeconsulta: '',
        diagnostico: '',
        observaciones: '',
        alergias: '',
        antecedentesmedicos: '',
        dientes: []
      };
    },
    error: (err) => {
      console.error(err);
      Swal.fire('Error', 'No se pudo guardar el historial clínico', 'error');
    }
  });
}
}
