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


  }
  verificar(e){
  
    if(e){
      this.aceptocon.emit("acepto");
    }else{
      this.aceptocon.emit("noacepto");
    }

  }

}
