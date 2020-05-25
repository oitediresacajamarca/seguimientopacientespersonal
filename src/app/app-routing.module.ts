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


const routes: Routes = [
  {path:'PRIMERO',component:PaneldeseguimientoComponent},
  {path:'',component:InicioComponent},
  {path:'login',component:LoginComponent},

  {path:'layout',component:DefaultComponent},
  {path:'personal.jsp',component:AccesoComponent},
  {path:'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',component:PrincipalComponent},
  {path:'public',component:PublicComponent},
  {path:'frontend',component:InicioComponent},
  {
    path: 'admin',
    component: DefaultComponent,
    children: [
    {
      path: 'reportes',
      component: DashboardComponent
    },
    {
      path:'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',
      component:PrincipalComponent
    },
    {
      path:'usuarios',
      component:UsuariosAdminComponent
    },
   
    {
      path: 'panel',
      component: PaneldeseguimientoComponent,
      children:[
        {
          path:'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',
          component:PrincipalComponent
        },
        {
          path:'',
          component:PrincipalComponent
        },
       
      ]
    },
    {    
          path:'consentimiento',
          component:ConsentimientoInformadoComponent      
      

    }

  
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
