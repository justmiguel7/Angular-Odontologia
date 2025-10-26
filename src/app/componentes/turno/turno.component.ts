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
    const dni = '12345678'; // ejemplo, o sacalo del AuthService
    this.servicio.listarPorDniOdontologo(dni).subscribe({
      next: (datos: Turno[]) => {
        console.log('Datos crudos que llegan:', datos);
        this.turnos = datos.map((turno: Turno) => ({
          ...turno,
          fechaYHora: new Date(turno.fechaYHora)
        }));
      },
      error: (err: any) => console.error('Error al cargar turnos del odontólogo', err)
    });
  }
}
