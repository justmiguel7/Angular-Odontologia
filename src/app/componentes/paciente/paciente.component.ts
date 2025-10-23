import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../service/paciente.service';
import { Paciente } from '../../modelo/Paciente';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {
  pacientes: Paciente[] = [];

  constructor(private servicio: PacienteService) {}

  ngOnInit(): void {
    this.listarPaciente();
  }

  listarPaciente() {
    this.servicio.listarPacientes().subscribe((datos) => {
      this.pacientes = datos;
    });
  }
}
