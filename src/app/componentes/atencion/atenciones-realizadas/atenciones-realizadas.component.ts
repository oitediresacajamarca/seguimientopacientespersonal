import { Component, OnInit, Input } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-atenciones-realizadas',
  templateUrl: './atenciones-realizadas.component.html',
  styleUrls: ['./atenciones-realizadas.component.css']
})
export class AtencionesRealizadasComponent implements OnInit {
  @Input() id_personal: string = '';
  datos_tabla_atenciones: any[] = []
  elementosmenu: any[]

  constructor(private ate: AtencionService, private estados_service: EstadosService) {


  }

  ngOnInit() {
    this.devolvertenciones();
    this.estados_service.actualizarNotificacione.subscribe(() => {
      this.devolvertenciones();

    })

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
          { label: 'Mostrar Fuat', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];

  }


  devolvertenciones() {
    this.id_personal = JSON.parse(localStorage.getItem('datos')).id_persona
    this.ate.devolverAtencionesRealizadas(this.id_personal).subscribe(datos => {
      this.datos_tabla_atenciones = datos.recordset;
    });
  }



}
