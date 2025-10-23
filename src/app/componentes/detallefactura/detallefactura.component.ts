import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleFacturaService } from '../../service/detallefactura.service';
import { Detallefact } from '../../modelo/DetalleFactura';

@Component({
  selector: 'app-detallefactura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detallefactura.component.html',
  styleUrl: './detallefactura.component.css'
})
export class DetallefacturaComponent {
  detallefact: Detallefact[] = [];

  constructor(private servicio: DetalleFacturaService) {}

  ngOnInit(): void {
    this.listarPaciente();
  }

  listarPaciente() {
    this.servicio.listarDetallesFacturas().subscribe((datos) => {
      this.detallefact = datos;
    });
  }
}


