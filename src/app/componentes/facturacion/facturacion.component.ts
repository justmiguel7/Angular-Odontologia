import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionService } from '../../service/facturacion.service';
import { Facturacion } from '../../modelo/Facturacion';

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent {
  facturaciones: Facturacion[] = [];

  constructor(private servicio: FacturacionService) {}

  ngOnInit(): void {
    this.listarFacturacion();
  }

  listarFacturacion() {
    this.servicio.listarFacturaciones().subscribe((datos) => {
      this.facturaciones = datos;
    });
  }
}
