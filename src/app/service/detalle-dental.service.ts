import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleDental } from '../modelo/Diente';
@Injectable({ providedIn: 'root' })
export class DetalleDentalService {
  private baseUrl = 'http://localhost:8090/api/detalles'; // microservicio de dientes
  constructor(private http: HttpClient) {}

  guardar(detalle: DetalleDental): Observable<any> {
    return this.http.post(this.baseUrl, detalle);
  }
}
