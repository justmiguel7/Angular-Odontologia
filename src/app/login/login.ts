import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { loginRequest } from '../modelo/loginRequest';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // 👈 esto es lo clave
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

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
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    });
  }

  emailNoValido() {
    return (this.loginForm.get('email')?.dirty || this.loginForm.get('email')?.touched) && this.loginForm.get('email')?.invalid;
  }

  passwordNoValido() {
    return (this.loginForm.get('password')?.dirty || this.loginForm.get('password')?.touched) && this.loginForm.get('password')?.invalid;
  }

  login() {
    if (this.loginForm.invalid) {
      console.warn("Formulario inválido");
      return;
    }

    const req = new loginRequest(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );

    this.servicio.login(req).subscribe(resp => {
      console.log(resp.token);
      localStorage.setItem("riverplate", resp.token);
      this.router.navigateByUrl('home');
    });
  }
}
