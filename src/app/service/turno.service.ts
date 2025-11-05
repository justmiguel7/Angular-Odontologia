import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../modelo/Turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private urlTurno = 'http://localhost:8084/turno';

    private urlBff = 'http://localhost:8080/turno';


  constructor(private http: HttpClient) {}

  // Listar todos los turnos
listarTurnos(): Observable<Turno[]> {
  const token = localStorage.getItem('riverplate');
  return this.http.get<Turno[]>(`${this.urlTurno}/listado`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
 

  // Listar turnos filtrados por DNI del odontólogo
  listarPorDniOdontologo(dni: string): Observable<Turno[]> {
      const token = localStorage.getItem('riverplate');
    return this.http.get<Turno[]>(`${this.urlTurno}/odontologo/${dni}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

  // Confirmar turno por ID + dni del odontólogo
  confirmarTurno(idTurno: number, dniOdontologo: string): Observable<Turno> {
      const token = localStorage.getItem('riverplate');
    return this.http.put<Turno>(
      `${this.urlBff}/confirmar/${idTurno}`,
      { dniOdontologo }, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}
