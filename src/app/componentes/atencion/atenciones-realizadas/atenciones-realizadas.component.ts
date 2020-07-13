import { Component, OnInit, Input } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { EstadosService } from 'src/app/servicios/estados.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-atenciones-realizadas',
  templateUrl: './atenciones-realizadas.component.html',
  styleUrls: ['./atenciones-realizadas.component.css']
})
export class AtencionesRealizadasComponent implements OnInit {
  @Input() id_personal: string = '';
  datos_tabla_atenciones: any[] = []
  elementosmenu: any[]
  desde: Date;
  hasta: Date
  formulario

  constructor(private ate: AtencionService, private estados_service: EstadosService, private fb:FormBuilder) {


  }

  ngOnInit() {
  
    this.estados_service.actualizarNotificacione.subscribe(() => {
  

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

   this.formulario= this.fb.group({DESDE:this.desde,HASTA:this.hasta})
  }
  buscarPorFechas() {

   
    let d =this.desde.getFullYear()+'/'+(this.desde.getMonth().valueOf()+1)+'/'+this.desde.getDate();
    let h =this.hasta.getFullYear()+'/'+(this.hasta.getMonth().valueOf()+1)+'/'+this.hasta.getDate();
    this.ate.devolverAtencionesRealizadasPorfecha(d,h).subscribe((datos) => {
      console.log(datos)
      this.datos_tabla_atenciones = datos;
    });

  }


  devolvertenciones() {
    this.id_personal = JSON.parse(localStorage.getItem('datos')).id_persona
    this.ate.devolverAtencionesRealizadas(this.id_personal).subscribe(datos => {
      this.datos_tabla_atenciones = datos.recordset;
    });
  }



}
