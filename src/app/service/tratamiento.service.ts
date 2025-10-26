import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../modelo/Tratamiento';
@Injectable({ providedIn: 'root' })
export class TratamientoService {
  private tratamientosUrl = 'http://localhost:8087/tratamientos';

  constructor(private http: HttpClient) {}

  getTratamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tratamientosUrl}/listado`);
  }
}
