import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudPacienteService } from 'src/app/servicios/solicitud-paciente.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MorbilidadesPorPacienteComponent } from '../morbilidades-por-paciente/morbilidades-por-paciente.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
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

  constructor(private solipac:SolicitudPacienteService,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
  this.cod_buscar=this.rutaActiva.snapshot.params.ID_PACIENTE;

  this.rutaActiva.params.subscribe(
    (params: Params) => {
      this.cod_buscar = params.ID_PACIENTE;
    
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




}
