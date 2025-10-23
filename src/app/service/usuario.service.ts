import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../modelo/Paciente';
 import { map , delay } from 'rxjs/operators';
  import { loginResponse } from '../modelo/loginResponse';

 import { loginRequest } from '../modelo/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }


  private urlUsuario = 'http://localhost:8085/usuarios';


 login( loginRequest : loginRequest): Observable<loginResponse> {

 const headers = new HttpHeaders();

return this.http.post<loginResponse>("http://localhost:8085/usuarios/login", loginRequest)
  .pipe(
    map((resp: loginResponse) => {
      return resp;
    })
  );
 }
}
