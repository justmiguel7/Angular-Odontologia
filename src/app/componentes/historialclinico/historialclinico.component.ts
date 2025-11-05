import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialClinicoService } from '../../service/historialclinico.service';
import { HistorialClinico } from '../../modelo/Historial-Clinico';
import { Tratamiento } from '../../modelo/Tratamiento';

@Component({
  selector: 'app-historialclinico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historialclinico.component.html',
  styleUrls: ['./historialclinico.component.css']
})
export class HistorialclinicoComponent {
  historialclinico: HistorialClinico[] = [];

  constructor(private servicio: HistorialClinicoService) {}

  ngOnInit(): void {
    this.listarHistorialClinico();
  }

  listarHistorialClinico() {
    this.servicio.listarHistorialClinico().subscribe(lista => {
      lista.forEach(historial => {
        this.servicio.obtenerHistorialConTratamientos(historial.idhistorial!).subscribe(completo => {
          Object.assign(historial, completo);
          // 👇 calcular total y guardarlo en el historial
          historial['totalCosto'] = this.calcularTotal(historial.tratamientos);
        });
      });
      this.historialclinico = lista;
    });
  }

  calcularTotal(tratamientos?: Tratamiento[]): number {
    if (!tratamientos) return 0;
    return tratamientos.reduce((total, t) => total + (t.costo || 0), 0);
  }
}
