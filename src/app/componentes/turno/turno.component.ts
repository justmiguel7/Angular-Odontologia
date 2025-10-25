import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../service/turno.service';
import { Turno } from '../../modelo/Turno';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent {
  turnos: Turno[] = [];

  constructor(private servicio: TurnoService) {}

  ngOnInit(): void {
    this.listarTurnos();
  }

listarTurnos() {
  this.servicio.listarTurnos().subscribe((datos) => {
    console.log('Datos crudos que llegan:', datos);
    this.turnos = datos.map(turno => ({
      ...turno,
      fechaYHora: new Date(turno.fechaYHora)
    }));
  });
}
}
