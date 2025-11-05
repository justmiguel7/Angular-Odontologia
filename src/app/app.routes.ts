import { Odontologo } from './modelo/Odontologo';
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
import { pacienteGuard } from './guard/paciente-guard';
import { odontologGuard } from './guard/odontologo-guard';
import { HistorialclinicoComponent } from './componentes/historialclinico/historialclinico.component';
import { ConfirmarTurnoRecepcionistaComponent } from './componentes/confirmar-turno-recepcionista/confirmar-turno-recepcionista.component';
import { recepcionistaGuard } from './guard/recepcionista-guard';
import { CancelarTurno } from './componentes/cancelar-turno/cancelar-turno';
import { OdontologoComponent } from './componentes/odontologo/odontologo.component';
import { TratamientosComponent } from './componentes/tratamientos/tratamientos.component';



export const routes: Routes = [
  { path: '', component: Carousel },
  { path: 'home', component: Carousel },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'pacientes', component: PacienteComponent, canActivate: [adminGuard] },
   { path: 'odontologo', component: OdontologoComponent, canActivate: [adminGuard] },
  { path: 'facturaciones', component: FacturacionComponent, canActivate: [adminGuard] },
  { path: 'historial-clinico', component: HistorialclinicoComponent },
  { path: 'turno', component: TurnoPacienteComponent, canActivate: [pacienteGuard] },
  { path: 'turno-listado', component: TurnoComponent, canActivate: [adminGuard] },
  {path: 'plandental', component: Plandental, canActivate: [pacienteGuard]},
  { path: 'reservar-turno', component: TurnoOdontologoComponent, canActivate: [odontologGuard] },
  { path: 'detallefactura', component: DetallefacturaComponent, canActivate: [adminGuard] },
  { path: 'agregar-historial', component: AgregarHistorial, canActivate: [odontologGuard] },
  { path: 'Confirmar', component: ConfirmarTurnoComponent, canActivate: [odontologGuard],},
  { path: 'Confirmar-Recepcionista', component: ConfirmarTurnoRecepcionistaComponent, canActivate: [recepcionistaGuard],},
  { path: 'FAQ', component: FAQComponent },
   { path: 'tratamientos', component: TratamientosComponent, canActivate: [adminGuard] },
  { path: 'QuienesSomos', component: QuienessomosComponent },
  { path: 'Contacto', component: ContactoComponente },
  {path: 'turno-cancelable', component: CancelarTurno},

  {
    path: 'dashboard-admin',
    component: Admincards,
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '' }

];
