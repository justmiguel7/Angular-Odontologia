import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { Login } from './login/login';
import { OdontologoComponent } from "./componentes/odontologo/odontologo.component";
import { NavbarComponent } from "./componentes/navbar/navbar";
import { Footer } from './componentes/footer/footer';
import { Admincards } from "./componentes/admincards/admincards";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, PacienteComponent, Login, OdontologoComponent, NavbarComponent, Footer, Admincards],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angularodontologia');
}
