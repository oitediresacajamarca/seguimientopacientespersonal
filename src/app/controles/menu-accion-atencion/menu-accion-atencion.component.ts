import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-accion-atencion',
  templateUrl: './menu-accion-atencion.component.html',
  styleUrls: ['./menu-accion-atencion.component.css']
})
export class MenuAccionAtencionComponent implements OnInit {
  elementosmenu: any[];
  @Input() atencion: any;
  constructor() { }

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
      }
    ];
  }
  mostrarFuat() {
   
    console.log(this.atencion)
  }

}
