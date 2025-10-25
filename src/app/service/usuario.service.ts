import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { loginRequest } from '../modelo/loginRequest';
import { loginResponse } from '../modelo/loginResponse';
import { RegistroPacienteDTO } from '../modelo/RegistroPacienteDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8085/auth'; // endpoint de Spring Security

  private bffUrl = 'http://localhost:8080/usuarios'; // endpoint de Spring Security


  constructor(private http: HttpClient) { }

  login(req: loginRequest): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.baseUrl}/login`, req)
      .pipe(map(resp => resp));
  }

 registrarPaciente(dto: RegistroPacienteDTO): Observable<string> {
    // ✅ importante: el backend devuelve texto (ResponseEntity<String>)
    return this.http.post(`${this.bffUrl}/registrar`, dto, { responseType: 'text' });
  }
}
