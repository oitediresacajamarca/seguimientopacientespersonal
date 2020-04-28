import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


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
  @Output() aceptocon:EventEmitter<any>=new EventEmitter()

  ngOnInit() {

    this.datossession=localStorage.getItem('datos');
    this.nombresyapellidosper=JSON.parse(this.datossession ).APELLIDO_PAT+' '+JSON.parse(this.datossession ).APELLIDO_MAT+' '+JSON.parse(this.datossession ).NOMBRES
    this.datospaciente=localStorage.getItem('datosPacienteRegistrar');
    this.apellidosynombrespaciente=JSON.parse(this.datospaciente).APELLIDO_PAT+' '+JSON.parse(this.datospaciente ).APELLIDO_MAT+' '+JSON.parse(this.datospaciente).NOMBRES
    this.dnipaciente=JSON.parse(this.datospaciente).NRO_DOCUMENTO;
  }
  verificar(e){
    console.log(e)
    if(e){
      this.aceptocon.emit("acepto");
    }else{
      this.aceptocon.emit("noacepto");
    }

  }

}
