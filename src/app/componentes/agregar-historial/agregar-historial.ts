import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialClinicoService } from '../../service/historialclinico.service';
import { TratamientoService } from '../../service/tratamiento.service';
import { TurnoService } from '../../service/turno.service';
import { DetalleDentalService } from '../../service/detalle-dental.service';
import { AuthService } from '../../service/auth.service';
import { PlandentalService } from '../../service/plandental.service';
import { DetalleDental } from '../../modelo/Diente';

@Component({
  selector: 'app-agregar-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-historial.html',
  styleUrls: ['./agregar-historial.css']
})
export class AgregarHistorial implements OnInit {
  turnos: any[] = [];
  tratamientos: any[] = [];
  dientesPaciente: any[] = []; // 🦷 Dientes del paciente cargados desde el backend
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
    private authService: AuthService,
    private plandentalService: PlandentalService // ✅ Importado el servicio de dientes
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
      next: (data) => {
        this.turnos = data.map(t => ({
          ...t,
          fechaYHora: new Date(t.fechaYHora)
        }));
        console.log('✅ Turnos cargados:', this.turnos);
      },
      error: (err) => console.error('❌ Error cargando turnos', err)
    });
  }

  cargarTratamientos() {
    this.tratamientoService.getTratamientos().subscribe({
      next: (data) => {
        this.tratamientos = data;
        console.log('✅ Tratamientos cargados:', this.tratamientos);
      },
      error: (err) => console.error('❌ Error cargando tratamientos', err)
    });
  }

  onTratamientoSeleccionado() {
    console.log('🦷 Tratamiento seleccionado ID:', this.form.idtratamiento);
    const tratamiento = this.tratamientos.find(t => t.id == this.form.idtratamiento);
    console.log('📋 Tratamiento completo:', tratamiento);
  }

  // 🦷 Cargar dientes del paciente según el turno seleccionado
  cargarDientesPaciente() {
    const turnoSeleccionado = this.turnos.find(t => t.idturno == this.form.idturno);
    if (!turnoSeleccionado) {
      Swal.fire('Error', 'Debe seleccionar un turno válido antes de cargar dientes', 'warning');
      return;
    }

    const dniPaciente = turnoSeleccionado.dnipaciente;
    this.plandentalService.obtenerDientesPorPaciente(dniPaciente).subscribe({
      next: (data) => {
        this.dientesPaciente = data;
        console.log('🦷 Dientes del paciente:', this.dientesPaciente);
        Swal.fire('Listo', 'Dientes del paciente cargados correctamente', 'success');
      },
      error: (err) => {
        console.error('❌ Error al cargar dientes del paciente', err);
        Swal.fire('Error', 'No se pudieron cargar los dientes del paciente', 'error');
      }
    });
  }

  agregarDiente() {
    if (this.dientesPaciente.length === 0) {
      Swal.fire('Atención', 'Debe cargar primero los dientes del paciente', 'info');
      return;
    }

    this.form.dientes.push({
      dienteId: '',
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
    idturno: Number(this.form.idturno),
  idtratamientos: this.form.idtratamientos || [], // ✅ ahora es lista
    motivodeconsulta: this.form.motivodeconsulta,
    fechadeconsulta: new Date().toISOString(),
    diagnostico: this.form.diagnostico,
    observaciones: this.form.observaciones,
    alergias: this.form.alergias,
    antecedentesmedicos: this.form.antecedentesmedicos
  };

  console.log('🚀 Payload a enviar (historial):', historial);

  this.historialService.crearHistorial(historial).subscribe({
    next: () => {
      // ✅ Enviar los detalles dentales después
      if (this.form.dientes.length > 0) {
        this.form.dientes.forEach((detalle: any) => {
const detalleEnviar: DetalleDental = {
  turnoId: Number(turnoSeleccionado.idturno),
  diente_id: Number(detalle.dienteId), // 👈 aquí va el id directo
  diagnostico: detalle.diagnostico,
  tratamiento: detalle.tratamiento,
  observaciones: detalle.observaciones,
  fechaRegistro: new Date().toISOString()
};


          console.log('🦷 Enviando detalle dental:', detalleEnviar);

          this.detalleDentalService.guardar(detalleEnviar).subscribe({
            next: () => console.log('✅ Detalle dental guardado'),
            error: (err) => console.error('❌ Error guardando detalle dental', err)
          });
        });
      }

      Swal.fire('Éxito', 'Historial clínico guardado correctamente', 'success');

      // 🔄 Resetear formulario
      this.form = {
        idturno: null,
        idtratamientos: [],
        motivodeconsulta: '',
        diagnostico: '',
        observaciones: '',
        alergias: '',
        antecedentesmedicos: '',
        dientes: []
      };
    },
    error: (err) => {
      console.error('❌ Error al guardar historial', err);
      Swal.fire('Error', 'No se pudo guardar el historial clínico', 'error');
    }
  });
}



}
