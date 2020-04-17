import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
import { AccesoComponent } from './componentes/acceso/acceso.component';
import { PrincipalComponent } from './componentes/atencion/principal.component';
import { InicioComponent } from './componentes/inicio/inicio.component';


const routes: Routes = [
  {path:'PRIMERO',component:PaneldeseguimientoComponent},
  {path:'',component:InicioComponent},
  {path:'personal.jsp',component:AccesoComponent},
  {path:'atencion/:NRO_DOCUMENTO/:ID_PACIENTE/:ID_SOLICITUD',component:PrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
