import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { EstadosService } from 'src/app/servicios/estados.service';
import { FuatServicioService } from 'src/app/servicios/formatos/fuat-servicio.service';

@Component({
  selector: 'app-historial-atencion',
  templateUrl: './historial-atencion.component.html',
  styleUrls: ['./historial-atencion.component.css']

})
export class HistorialAtencionComponent implements OnInit {
  atenciones

  id_persona = 1471084
  constructor(private atencioness: AtencionService, private estadoss: EstadosService,
    private fuatservicio:FuatServicioService ) { }

  ngOnInit() {

    this.estadoss.cambiopaciente.subscribe((data) => {
      this.id_persona = data

      this.cargarAtenciones()
    })
    this.cargarAtenciones()
  }

  cargarAtenciones() {


    this.atencioness.devolverAtencionesRealizadasPersona(this.id_persona).subscribe((datos) => {
      this.atenciones = datos;

    })
  }
  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  selectCar($event, car) {

  }
  onSortChange() { }
  Imprimefuat(atencion){
   console.log(atencion)


   this.fuatservicio.getFuat(atencion.ID_ATENCION).subscribe((FUAT)=>{
     this.fuatservicio.mostrarFuat(FUAT)
   })

  }

}
