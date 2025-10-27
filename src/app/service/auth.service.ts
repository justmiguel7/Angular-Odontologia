import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  // Guardar token
  setToken(token: string) {
    localStorage.setItem('riverplate', token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('riverplate');
  }

  // Decodifica el payload del JWT
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  // Leer rol del token
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload: any = jwtDecode(token);
      return payload.rol || null;
    } catch (e) {
      return null;
    }
  }



  // Check si está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Logout
logout(): void {
  localStorage.removeItem('riverplate');
}


  // Leer DNI del token
  getDni(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload: any = jwtDecode(token);
      return payload.dni || null;
    } catch (e) {
      console.error('Error al decodificar token:', e);
      return null;
    }
  }


}
