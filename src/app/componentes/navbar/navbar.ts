import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Login } from '../../login/login';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, Login],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {

  menuAbierto = false;
  modalLoginAbierto = false;

  isLogged = false;
  rol: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.verificarSesion();
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  abrirModalLogin() {
    this.modalLoginAbierto = true;
  }

  cerrarModalLogin() {
    this.modalLoginAbierto = false;
    this.verificarSesion(); // actualiza estado luego del login
  }

  private verificarSesion() {
    this.isLogged = this.authService.isLoggedIn();
    this.rol = this.authService.getRole();
  }

  logout() {
    this.authService.logout();

    Swal.fire({
      title: 'Cierre de sesión exitoso',
      text: 'Nos vemos pronto 👋',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      this.verificarSesion();
      this.router.navigateByUrl('/'); // redirige a inicio
    });
  }

  obtenerDni(): string {
    try {
      const tokenPayload: any = jwtDecode(this.authService.getToken() || '');
      return tokenPayload.dni || '';
    } catch {
      return '';
    }
  }

  obtenerDniPaciente(): string {
    // placeholder: reemplazar por la lógica real si es necesario
    return '12345678';
  }
}
