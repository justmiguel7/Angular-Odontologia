import { jwtDecode } from 'jwt-decode';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { loginRequest } from '../modelo/loginRequest';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // 👈 importamos SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  @Output() loginSuccess = new EventEmitter<void>(); // Para cerrar modal desde navbar
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servicio: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]]
    });
  }

  emailNoValido() {
    return (this.loginForm.get('email')?.dirty || this.loginForm.get('email')?.touched) && this.loginForm.get('email')?.invalid;
  }

  passwordNoValido() {
    return (this.loginForm.get('password')?.dirty || this.loginForm.get('password')?.touched) && this.loginForm.get('password')?.invalid;
  }

  login(event: Event) {
    event.preventDefault();

    if (this.loginForm.invalid) return;

    const req = new loginRequest(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );

    this.servicio.login(req).subscribe({
      next: (resp) => {
        localStorage.setItem("riverplate", resp.token);

        try {
          const tokenPayload: any = jwtDecode(resp.token);
          const rol = tokenPayload.rol;

          // Emitir evento al navbar para cerrar modal
          this.loginSuccess.emit();

          // 🔥 Mostrar alerta de éxito
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            text: 'Redirigiendo...',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });

          // Esperar 3 segundos antes de redirigir
          setTimeout(() => {
            if (rol === 'ADMINISTRADOR') {
              this.router.navigateByUrl('dashboard-admin');
            } else {
              this.router.navigateByUrl('home');
            }
          }, 3000);
        } catch (e) {
          console.error("Error al decodificar token:", e);
          this.router.navigateByUrl('home');
        }
      },
      error: (err) => {
        console.error("Error login:", err);
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
}
