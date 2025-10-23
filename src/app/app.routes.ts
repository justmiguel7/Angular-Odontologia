import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { Admincards } from './componentes/admincards/admincards';
import { DetallefacturaComponent } from './componentes/detallefactura/detallefactura.component';
import { FacturacionComponent } from './componentes/facturacion/facturacion.component';

export const routes: Routes = [
  { path: '', component: Admincards },
  { path: 'home', component: PacienteComponent },
  { path: 'login', component: Login },
  { path: 'pacientes', component: PacienteComponent },
  { path: 'facturaciones', component: FacturacionComponent },
  { path: 'detallefactura', component: DetallefacturaComponent },
  { path: '**', redirectTo: '' }
];
