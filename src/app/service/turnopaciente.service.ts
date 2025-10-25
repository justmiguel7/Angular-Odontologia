import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../modelo/Turno';
 import { map , delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private urlOdontologiabff = 'http://localhost:8080/turno'; // tu BFF

  constructor(private http: HttpClient) {}

  agregarTurnoPaciente(turno: Turno): Observable<any> {
    return this.http.post(`${this.urlOdontologiabff}/agregarTurnoPaciente`, turno);
  }

  listarTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.urlOdontologiabff}/listado`);
  }
}
