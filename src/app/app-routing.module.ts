import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
import { AccesoComponent } from './componentes/acceso/acceso.component';
import { PrincipalComponent } from './componentes/atencion/principal.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DefaultComponent } from './layouts/default/default.component';
import { PublicComponent } from './componentes/public/public.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ConsentimientoInformadoComponent } from './componentes/formatos/consentimiento-informado/consentimiento-informado.component';
import { UsuariosAdminComponent } from './modulos/usuarios/usuarios-admin/usuarios-admin.component';
import { LoginComponent } from './modulos/usuarios/login/login.component';
import { GeoreferenciaComponent } from './georeferencia/georeferencia.component';
import { SelectorCieCpmsComponent } from './controles/selector-cie-cpms/selector-cie-cpms.component';
import { ActualizarContraseniaComponent } from './modulos/usuarios/usuarios-admin/actualizar-contrasenia/actualizar-contrasenia.component';


const routes: Routes = [
  { path: 'PRIMERO', component: PaneldeseguimientoComponent },
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seguimientopacientespersonal', component: LoginComponent },

  { path: 'layout', component: DefaultComponent },
  { path: 'personal.jsp', component: LoginComponent },
  { path: 'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD', component: PrincipalComponent },
  { path: 'public', component: PublicComponent },
  { path: 'frontend', component: InicioComponent },
  { path: 'geo', component: GeoreferenciaComponent },
  { path: 'cie', component: SelectorCieCpmsComponent },
  { path: 'actualizar-usuario', component: ActualizarContraseniaComponent,outlet:'emergente' },
  {
    path: 'admin',
    component: DefaultComponent,
    children: [
      {
        path: 'reportes',
        component: DashboardComponent
      },
      {
        path: 'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',
        component: PrincipalComponent
      },
      {
        path: 'usuarios',
        component: UsuariosAdminComponent
      },
      {
        path: 'atencion',
        component: PrincipalComponent
      },

      {
        path: 'panel',
        component: PaneldeseguimientoComponent,
        children: [
          {
            path: 'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',
            component: PrincipalComponent
          },
          {
            path: '',
            component: PrincipalComponent
          },

        ]
      },
      {
        path: 'consentimiento',
        component: ConsentimientoInformadoComponent


      }


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
