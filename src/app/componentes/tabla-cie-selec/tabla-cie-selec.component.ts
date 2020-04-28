import { Component, OnInit } from '@angular/core';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-tabla-cie-selec',
  templateUrl: './tabla-cie-selec.component.html',
  styleUrls: ['./tabla-cie-selec.component.css']
})
export class TablaCieSelecComponent implements OnInit {
cies:any[]=[];
ciesselected:any[]=[]
items:MenuItem[];
selectedCie:any;
  constructor(private morb:MorbilidadesService) { }

  ngOnInit() {
    this.items=[{label:'Agregar Diagnostico'}]
    this.morb.devolverMorbilidades().subscribe((datos)=>{
      this.cies=datos.respuesta;
    })
  }

}
