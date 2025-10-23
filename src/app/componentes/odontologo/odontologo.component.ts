import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OdontologoService } from '../../service/odontologo.service';
import { Odontologo } from '../../modelo/Odontologo';

@Component({
  selector: 'app-odontologo',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './odontologo.component.html',
  styleUrl: './odontologo.component.css'
})
export class OdontologoComponent {
  odontologos: Odontologo[] = [];

  constructor(private servicio: OdontologoService) {}

  ngOnInit(): void {
    this.listarPaciente();
  }

  listarPaciente() {
    this.servicio.listarOdontologos().subscribe((datos) => {
      this.odontologos = datos;
    });
  }

}
