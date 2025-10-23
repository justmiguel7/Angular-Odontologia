import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Odontologo } from '../modelo/Odontologo';
 import { map , delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  constructor(public http: HttpClient) { }

    private urlOdontologo = 'http://localhost:8082/odontologo';


      listarOdontologos(): Observable<Odontologo[]> {    // Endpoint de la API
    return this.http.get<Odontologo[]>(`${this.urlOdontologo}/listado`);
 }
}
