import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consentimiento-informado',
  templateUrl: './consentimiento-informado.component.html',
  styleUrls: ['./consentimiento-informado.component.css']
})
export class ConsentimientoInformadoComponent implements OnInit {

  nombresyapellidosper:string
  datossession:any;
  display:boolean=true;
  datospaciente:any={};
  @Input() apellidosynombrespaciente:string;
  @Input() dnipaciente:string;
  aceptaconsetimiento:boolean
  constructor() { }

  ngOnInit() {

    this.datossession=localStorage.getItem('datos');
    this.nombresyapellidosper=JSON.parse(this.datossession ).APELLIDO_PAT+' '+JSON.parse(this.datossession ).APELLIDO_MAT+' '+JSON.parse(this.datossession ).NOMBRES
    this.datospaciente=localStorage.getItem('datosPacienteRegistrar');
    this.apellidosynombrespaciente=JSON.parse(this.datospaciente).APELLIDO_PAT+' '+JSON.parse(this.datospaciente ).APELLIDO_MAT+' '+JSON.parse(this.datospaciente).NOMBRES
    this.dnipaciente=JSON.parse(this.datospaciente).NRO_DOCUMENTO;
  }

}
