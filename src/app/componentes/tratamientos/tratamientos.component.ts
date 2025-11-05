import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TratamientoService } from '../../service/tratamiento.service';
import { Tratamiento } from '../../modelo/Tratamiento';

@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css'],
})
export class TratamientosComponent {
  tratamientos: Tratamiento[] = [];

  constructor(private servicio: TratamientoService) {}

  ngOnInit(): void {
    this.listarTratamientos();
  }

  listarTratamientos() {
    this.servicio.getTratamientos().subscribe((datos) => {
      // 🔹 Mapear costoBase a costo para mostrar en la tabla
      this.tratamientos = datos.map(t => ({
        ...t,
        costo: (t as any).costoBase
      }));
      console.log('✅ Tratamientos cargados:', this.tratamientos);
    });
  }
}
