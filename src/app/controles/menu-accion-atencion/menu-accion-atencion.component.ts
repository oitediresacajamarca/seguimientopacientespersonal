import { Component, OnInit, Input } from '@angular/core';
import { FuatServicioService } from 'src/app/servicios/formatos/fuat-servicio.service';
import { RecetaService } from 'src/app/servicios/impresiones/receta.service';


@Component({
  selector: 'app-menu-accion-atencion',
  templateUrl: './menu-accion-atencion.component.html',
  styleUrls: ['./menu-accion-atencion.component.css']
})
export class MenuAccionAtencionComponent implements OnInit {
  elementosmenu: any[];
  @Input() atencion: any;
  constructor(private fuats:FuatServicioService,private recetas:RecetaService) { }

  ngOnInit() {

    this.elementosmenu = [
      {
        label: 'Atencion',
        items: [{
          label: 'Diagnosticos Realizados',
          icon: 'pi pi-fw pi-plus',

        },
        { label: 'Examenes Fisicos' },
        { label: 'Tratamiento' }
        ]
      },
      {
        label: 'FUAT',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Mostrar Fuat', icon: 'pi pi-fw pi-trash', command: ()=>{this.mostrarFuat() }},
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'RECETA',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Mostrar Receta', icon: 'pi pi-fw pi-trash', command: ()=>{this.mostrarReceta() }},
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

  mostrarReceta() {
    this.recetas.verReceta(this.atencion.ID_ATENCION)   
   
  }
  mostrarFuat() {
    this.fuats.mostrarFuatporCodigoAtencion(this.atencion.ID_ATENCION)   
  
  }

}
