import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HistorialClinico } from '../modelo/Historial-Clinico';
import { Tratamiento } from '../modelo/Tratamiento'; // 👈 Importante

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  private urlHistorialClinico = 'http://localhost:8086/historialclinico';
  private tratamientosUrl = 'http://localhost:8087/tratamientos';

  constructor(private http: HttpClient) { }

  listarHistorialClinico(): Observable<HistorialClinico[]> {
    return this.http.get<HistorialClinico[]>(`${this.urlHistorialClinico}/listado`);
  }

  crearHistorial(historial: HistorialClinico): Observable<any> {
    return this.http.post(`${this.urlHistorialClinico}/agregar`, historial);
  }

  obtenerHistorial(dnipaciente: string): Observable<any> {
    return this.http.get(`${this.urlHistorialClinico}/${dnipaciente}`);
  }

  // 🔥 Este método devuelve el historial con los datos completos de los tratamientos
obtenerHistorialConTratamientos(idHistorial: number): Observable<any> {
  return this.http.get<HistorialClinico>(`${this.urlHistorialClinico}/historial/${idHistorial}`).pipe(
    switchMap(historial =>
      forkJoin(historial.idtratamientos.map(id =>
        this.http.get<Tratamiento>(`${this.tratamientosUrl}/${id}`)
      )).pipe(
        map(tratamientos => {
          console.log('Tratamientos crudos del backend:', tratamientos); // 👈 VER QUE LLEGA

          // Mapear costoBase a costo
          const mapTratamientos = tratamientos.map(t => ({
            ...t,
            costo: (t as any).costoBase
          }));

          console.log('Tratamientos mapeados:', mapTratamientos); // 👈 VER despues del mapeo
          return {
            ...historial,
            tratamientos: mapTratamientos
          };
        })
      )
    )
  );
}



}
