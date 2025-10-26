import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../modelo/Turno';


@Injectable({
  providedIn: 'root'
})
export class TurnoOdontologoService {

  private urlOdontologiabff = 'http://localhost:8080/turno'; // tu BFF

  constructor(private http: HttpClient) {}

  agregarTurnoOdontologo(turno: Turno): Observable<any> {
    return this.http.post(`${this.urlOdontologiabff}/agregarTurnoOdontologo`, turno);
  }

  listarTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.urlOdontologiabff}/listado`);
  }
}
