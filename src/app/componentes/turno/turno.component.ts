import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../service/turno.service';
import { Turno } from '../../modelo/Turno';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  turnos: Turno[] = [];

  constructor(private servicio: TurnoService) {}

  ngOnInit(): void {
    this.listarTurnos();
  }

  listarTurnos(): void {
    this.servicio.listarTurnos().subscribe({
      next: (datos: Turno[]) => {
        // convertimos la fecha de string a Date
        this.turnos = datos.map(turno => ({
          ...turno,
          fechaYHora: new Date(turno.fechaYHora)
        }));
        console.log('Turnos cargados:', this.turnos);
      },
      error: (err: any) => console.error('Error al cargar turnos:', err)
    });
  }
}
