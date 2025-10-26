import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialClinico } from '../modelo/Historial-Clinico';
import { map , delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  constructor(public http: HttpClient) { }

    private urlHistorialClinico = 'http://localhost:8086/historialclinico';


      listarHistorialClinico(): Observable<HistorialClinico[]> {    // Endpoint de la API
    return this.http.get<HistorialClinico[]>(`${this.urlHistorialClinico}/listado`);
 }

   crearHistorial(historial: HistorialClinico): Observable<any> {
    return this.http.post(`${this.urlHistorialClinico}/agregar`, historial);
  }

  obtenerHistorial(dnipaciente: string): Observable<any> {
    return this.http.get(`${this.urlHistorialClinico}/${dnipaciente}`);
  }


}
