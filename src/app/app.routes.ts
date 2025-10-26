import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { Admincards } from './componentes/admincards/admincards';
import { DetallefacturaComponent } from './componentes/detallefactura/detallefactura.component';
import { FacturacionComponent } from './componentes/facturacion/facturacion.component';
import { Carousel } from './componentes/carousel/carousel';
import { adminGuard } from './guard/admin-guard';
import { Register } from './register/register';
import { TurnoPacienteComponent } from './componentes/turnopaciente/turnopaciente.component';
import { Plandental } from './componentes/plandental/plandental';
import { TurnoOdontologoComponent } from './componentes/turnoodontologo/turnoodontologo.component';
import { AgregarHistorial } from './componentes/agregar-historial/agregar-historial';

export const routes: Routes = [
  { path: '', component: Carousel },
  { path: 'home', component: PacienteComponent },
  { path: 'login', component: Login },
    { path: 'register', component: Register },
  { path: 'pacientes', component: PacienteComponent },
  { path: 'facturaciones', component: FacturacionComponent },
      { path: 'turno', component: TurnoPacienteComponent },
      {path: 'plandental', component: Plandental},
        { path: 'reservar-turno', component: TurnoOdontologoComponent },
  { path: 'detallefactura', component: DetallefacturaComponent },
    { path: 'agregar-historial', component: AgregarHistorial },

  {
    path: 'dashboard-admin',
    component: Admincards,
    canActivate: [adminGuard] // protegido solo para ADMIN
  },
  { path: '**', redirectTo: '' }

];
