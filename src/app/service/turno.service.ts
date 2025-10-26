import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../modelo/Turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private urlTurno = 'http://localhost:8084/turno';

  constructor(private http: HttpClient) {}

  // Listar todos los turnos
  listarTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.urlTurno}/listado`);
  }

  // Listar turnos filtrados por DNI del odontólogo
  listarPorDniOdontologo(dni: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.urlTurno}/odontologo/${dni}`);
  }
}
