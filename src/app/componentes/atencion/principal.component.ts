import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudPacienteService } from 'src/app/servicios/solicitud-paciente.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MorbilidadesPorPacienteComponent } from '../morbilidades-por-paciente/morbilidades-por-paciente.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  sideBarOpen:boolean=false;
  @ViewChild('mpp',{static:false}) mpp:MorbilidadesPorPacienteComponent;
  verpanelregistro:boolean=false;
  form:any= { 
    "APELLIDO_PAT": "",
  "APELLIDO_MAT": "",
  "NOMBRES": "",
  "NRO_DOCUMENTO": '',
  "NOMBRE_PROVINCIA": "",
  "NOMBRE_DISTRITO": "",
  "TELEFONO": "",
  "CORREO": "",
  "DESCRIPCION": "",
  "TELEF_CONTACTO": "",
  "TELEF_CONTACTO2": "",
  "DOMICILIO_ACTUAL": "",
  "FECHA_SOLICITUD": "",
  "ESTADO": "",
  "CORREO2": "",
  "ID_DISTRITO": "",
  "FECHA_NAC": "",
  "ID_GENERO": '',
  "ID_SOLICITUD": ''}   ;
  cod_buscar:string;
  ID_PACIENTE:string;
  ID_SOLICITUD:string;

  constructor(private solipac:SolicitudPacienteService,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
  this.cod_buscar=this.rutaActiva.snapshot.params.ID_PACIENTE;

  this.rutaActiva.params.subscribe(
    (params: Params) => {
      this.cod_buscar = params.NRO_DOCUMENTO;
      this.ID_PACIENTE=params.ID_PACIENTE;
      this.ID_SOLICITUD=params.ID_SOLICITUD


    
    }
  );

  }

  buscarSolicitud(){
      this.solipac.buscarSolicitud(this.cod_buscar).subscribe((dat)=>{
        
        
        this.form=dat.respuesta;
        this.mpp.actualizarDatos(this.cod_buscar);
      
      
      
      });
  }

  IniciaRegistro(e){
    this.verpanelregistro=true;

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
