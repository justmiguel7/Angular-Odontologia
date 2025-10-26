import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlandentalService } from '../../service/plandental.service';
import { Diente } from '../../modelo/Diente';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-plandental',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './plandental.html',
  styleUrls: ['./plandental.css']
})
export class Plandental implements OnInit {

  dniPaciente!: string;
  dientes: Diente[] = [];
  dienteSeleccionado?: Diente;

  constructor(
    private dienteService: PlandentalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const dni = this.authService.getDni();
    if (!dni) {
      console.error('No se encontró DNI en el token');
      return;
    }
    this.dniPaciente = dni;
    this.cargarDientes();
  }

  cargarDientes() {
    this.dienteService.obtenerDientesPorPaciente(this.dniPaciente)
      .subscribe(d => {
        if (d.length === 0) {
          this.crearBase();
        } else {
          this.dientes = d;
        }
      });
  }

  seleccionarDiente(diente: Diente) {
    this.dienteSeleccionado = diente;
  }

  crearBase() {
    this.dienteService.crearDientesBase(this.dniPaciente)
      .subscribe(d => this.dientes = d);
  }
}
