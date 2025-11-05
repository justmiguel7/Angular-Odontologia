// src/app/componentes/register/register.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../service/usuario.service';
import { RegistroPacienteDTO } from '../modelo/RegistroPacienteDTO';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicio: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  campoNoValido(campo: string) {
    const control = this.registerForm.get(campo);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  registrar() {
    if (this.registerForm.invalid) return;

    const dto = new RegistroPacienteDTO(
      this.registerForm.value.nombre,
      this.registerForm.value.apellido,
      this.registerForm.value.direccion,
      this.registerForm.value.dni,
      this.registerForm.value.telefono,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

      // Mostrar SweetAlert con spinner
  Swal.fire({
    title: 'Registrando...',
    html: 'Por favor, espera',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

this.servicio.registrarPaciente(dto).subscribe({
  next: (response) => {
    console.log('Respuesta del backend:', response);
    Swal.fire({
      title: '¡Registro exitoso!',
      text: 'Tu cuenta de paciente fue creada',
      icon: 'success',
      confirmButtonText: 'Ir al inicio'
    }).then(() => this.router.navigateByUrl('/home'));
  },
  error: (err) => {
    console.error("Error al registrar:", err);
    Swal.fire({
      title: 'Error',
      text: err.error || 'No se pudo registrar el usuario',
      icon: 'error',
      confirmButtonText: 'Intentar de nuevo'
    });
  }
});

  }
}
