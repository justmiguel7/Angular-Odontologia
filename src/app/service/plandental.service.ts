import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diente } from '../modelo/Diente';

@Injectable({
  providedIn: 'root'
})
export class PlandentalService {
private baseUrl = 'http://localhost:8090/api/dientes';

  constructor(private http: HttpClient) {}

  // Traer dientes por DNI de paciente
  obtenerDientesPorPaciente(dni: string): Observable<Diente[]> {
    return this.http.get<Diente[]>(`${this.baseUrl}/paciente/${dni}`);
  }

  // Crear dientes base para un pacientea
  crearDientesBase(dni: string): Observable<Diente[]> {
    return this.http.post<Diente[]>(`${this.baseUrl}/paciente/${dni}/crear-base`, {});
  }

  // Guardar/actualizar un diente
  guardarDiente(diente: Diente) {
    return this.http.post<Diente>(this.baseUrl, diente);
  }
}
