import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../modelo/Turno';
 import { map , delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(public http: HttpClient) { }

    private urlTurno = 'http://localhost:8084/turno';


      listarTurnos(): Observable<Turno[]> {    // Endpoint de la API
    return this.http.get<Turno[]>(`${this.urlTurno}/listado`);
 }
}
