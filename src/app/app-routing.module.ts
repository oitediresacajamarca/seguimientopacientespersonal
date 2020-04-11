import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
import { AccesoComponent } from './componentes/acceso/acceso.component';


const routes: Routes = [
  {path:'',component:AccesoComponent},
  {path:'personal.jsp',component:PaneldeseguimientoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
