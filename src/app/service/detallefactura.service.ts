import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Detallefact } from '../modelo/DetalleFactura';
 import { map , delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {

  constructor(public http: HttpClient) { }

    private urlDetalleFactura = 'http://localhost:8089/detallefactura';


      listarDetallesFacturas(): Observable<Detallefact[]> {    // Endpoint de la API
    return this.http.get<Detallefact[]>(`${this.urlDetalleFactura}/listado`);
 }

}
