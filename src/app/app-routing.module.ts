import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
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
import { HistorialAtencionComponent } from './atencion/historial-atencion/historial-atencion.component';
import { BusquedaNominalComponent } from './componentes/busqueda-nominal/busqueda-nominal.component';
import { TicketRecetaComponent } from './impresiones/ticket-receta/ticket-receta.component';

import { SolicitudAtencionComponent } from './formularios/solicitud-atencion/solicitud-atencion.component';
import { SelectorCarteraServiciosComponent } from './controles/selector-cartera-servicios/selector-cartera-servicios.component';
import { SelectorFinanciadorComponent } from './controles/selector-financiador/selector-financiador.component';
import { SelectorGeograficoVerticalComponent } from './controles/selector-geografico-vertical/selector-geografico-vertical.component';
import { ConInfComponent } from './impresiones/con-inf/con-inf.component';
import { FormDerivacionComponent } from './formularios/form-derivacion/form-derivacion.component';
import { CmpsSelectorTablaComponent } from './controles/cmps-selector-tabla/cmps-selector-tabla.component';
import { BuscadorCpmsComponent } from './controles/buscador-cpms/buscador-cpms.component';
import { CovidComponent } from './componentes/covid/covid.component';
import { RegistrarAtencionComponent } from './componentes/registrar-atencion/registrar-atencion.component';
import { SelectorGeograficoVerticalMaterialComponent } from './controles/selector-geografico-vertical-material/selector-geografico-vertical-material.component';



const routes: Routes = [

  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seguimientopacientespersonal', component: LoginComponent },
  { path: 'layout', component: DefaultComponent },
  { path: 'personal.jsp', component: LoginComponent },
  {path: 'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD', component: PrincipalComponent,},
  { path: 'public', component: PublicComponent },
  { path: 'frontend', component: InicioComponent },
  { path: 'geo', component: GeoreferenciaComponent },
  { path: 'cie', component: SelectorCieCpmsComponent },
  { path: 'actualizar', component: ActualizarContraseniaComponent, outlet: 'emergente' },
  { path: 'nuevaSolicitud', component:PublicComponent , outlet: 'emergente' },  
  { path: 'buscardni', component: BusquedaNominalComponent, outlet: 'emergente' },
  { path: 'NuevaSolicitud', component: SolicitudAtencionComponent, outlet: 'emergente' }, 
  { path: '1', component:BuscadorCpmsComponent },
  { path: '2', component:GeoreferenciaComponent },
  { path: '3', component:CovidComponent },  
  { path: '4', component:FormDerivacionComponent },  
  { path: '5', component:SelectorGeograficoVerticalMaterialComponent },          
 
  {path:'recetaprint',component:TicketRecetaComponent},
  {
    path: 'admin',
    component: DefaultComponent,
    children: [
      {
        path: 'reportes',
        component: DashboardComponent
      },
      { path: 'actualizar', component: ActualizarContraseniaComponent, outlet: 'emergente' }
      ,
      {
        path: 'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',
        component: PrincipalComponent,
        children: [{ path: 'historial', component: HistorialAtencionComponent }]
      },
      {
        path: 'usuarios',
        component: UsuariosAdminComponent
      },
      {
        path: 'atencion',
        component: PrincipalComponent,
        
      },
      { path: 'NuevaSolicitud', component: SolicitudAtencionComponent, outlet: 'emergente' },  

      {
        path: 'panel',
        component: PaneldeseguimientoComponent,

        children: [
          {
            path: 'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',
            component: PrincipalComponent,
            children: [{ path: 'historial', component: HistorialAtencionComponent }]

          },
          {
            path: 'inicio',
            component: PrincipalComponent,
           
          },
          {
            path: 'actualizar',
            component: ActualizarContraseniaComponent,

          }

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
