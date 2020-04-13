import { Component, OnInit, Input } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  fechaatencion:Date=new Date()
  @Input() cod_paciente:string
  @Input() visible:boolean;
  motivoAte:string;
  casocovit:boolean;
  tipocov:string;
  trabajador_id:string;
sesion:any;
  constructor( private aten:AtencionService) { }

  ngOnInit() {
    this.sesion=JSON.parse(localStorage.getItem('datos'));

    this.trabajador_id=this.sesion.TRABAJADOR_ID;
  }



  registrarAtencion(){
    alert()

    let fechacadena=this.fechaatencion.getDate()+'/'+(this.fechaatencion.getMonth()+1).toString()+'/'+this.fechaatencion.getFullYear();
    let casocovi='N'
    if(this.casocovit){
      let casocovi='S'

    }
     this.aten.registrar(this.trabajador_id,fechacadena,this.cod_paciente,'0',casocovi,this.tipocov).subscribe((datos)=>{

      console.log(datos)
     });

  }

}
