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
import { ConfirmarTurnoComponent } from './componentes/confirmar-turno/confirmar-turno.componente';
import { TurnoComponent } from './componentes/turno/turno.component';
import { FAQComponent } from './componentes/faq/faq.component';
import { QuienessomosComponent } from './componentes/quienessomos/quienessomos.component';
import { ContactoComponente } from './componentes/contacto/contacto.componente';


export const routes: Routes = [
  { path: '', component: Carousel },
  { path: 'home', component: PacienteComponent },
  { path: 'login', component: Login },
    { path: 'register', component: Register },
  { path: 'pacientes', component: PacienteComponent },
  { path: 'facturaciones', component: FacturacionComponent },
      { path: 'turno', component: TurnoPacienteComponent },
            { path: 'turno-listado', component: TurnoComponent },
      {path: 'plandental', component: Plandental},
        { path: 'reservar-turno', component: TurnoOdontologoComponent },
  { path: 'detallefactura', component: DetallefacturaComponent },
    { path: 'agregar-historial', component: AgregarHistorial },
      { path: 'Confirmar', component: ConfirmarTurnoComponent },
          { path: 'FAQ', component: FAQComponent },
      { path: 'QuienesSomos', component: QuienessomosComponent },
        { path: 'Contacto', component: ContactoComponente },

  {
    path: 'dashboard-admin',
    component: Admincards,
    canActivate: [adminGuard] // protegido solo para ADMIN
  },
  { path: '**', redirectTo: '' }

];
