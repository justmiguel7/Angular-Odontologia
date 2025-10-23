import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../modelo/Paciente';
 import { map , delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(public http: HttpClient) { }

    private urlPaciente = 'http://localhost:8081/paciente';


      listarPacientes(): Observable<Paciente[]> {    // Endpoint de la API
    return this.http.get<Paciente[]>(`${this.urlPaciente}/listado`);
 }










}
