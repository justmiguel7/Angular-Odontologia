import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialClinicoService } from '../../service/historialclinico.service';
import { HistorialClinico } from '../../modelo/Historial-Clinico';
@Component({
  selector: 'app-historialclinico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historialclinico.component.html',
  styleUrl: './historialclinico.component.css'
})
export class HistorialclinicoComponent {
  historialclinico: HistorialClinico[] = [];

  constructor(private servicio: HistorialClinicoService) {}

  ngOnInit(): void {
    this.listarHistorialClinico();
  }

  listarHistorialClinico() {
    this.servicio.listarHistorialClinico().subscribe((datos) => {
      this.historialclinico = datos;
    });
  }

}
