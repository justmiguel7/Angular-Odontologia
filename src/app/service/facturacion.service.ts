import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facturacion } from '../modelo/Facturacion';



 import { map , delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  constructor(public http: HttpClient) { }

    private urlFacturacion = 'http://localhost:8086/facturacion';


      listarFacturaciones(): Observable<Facturacion[]> {    // Endpoint de la API
    return this.http.get<Facturacion[]>(`${this.urlFacturacion}/listado`);
 }
}
