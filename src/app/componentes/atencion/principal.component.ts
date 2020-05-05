import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudPacienteService } from 'src/app/servicios/solicitud-paciente.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MorbilidadesPorPacienteComponent } from '../morbilidades-por-paciente/morbilidades-por-paciente.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { FormatoFuat } from 'src/app/interfaces/formato-fuat';
import { Configuracion } from 'src/app/configuracion/configuracion';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  sideBarOpen:boolean=false;
  @ViewChild('mpp',{static:false}) mpp:MorbilidadesPorPacienteComponent;
  verpanelregistro:boolean=false;
  formsol:any=
  { 
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
  "ID_SOLICITUD": ''}  ;
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
  formatoFuat:FormatoFuat
  es:any;

  constructor(private solipac:SolicitudPacienteService,private rutaActiva: ActivatedRoute,private personser:PersonaService,private GEO:GeografiaService) { }

  ngOnInit() {
  this.cod_buscar=this.rutaActiva.snapshot.params.ID_PACIENTE;
  this.es=(new Configuracion()).es

  this.rutaActiva.params.subscribe(
    (params: Params) => {
      this.cod_buscar = params.NRO_DOCUMENTO;
      this.ID_PACIENTE=params.ID_PACIENTE;
      this.ID_SOLICITUD=params.ID_SOLICITUD


    
    }
  );

  }

  buscarSolicitud(){
    
        this.personser.devolverPersonaPaciente('1',this.cod_buscar).subscribe((dat)=>{
        
        this.form=dat.respuesta;

        if(dat.respuesta.ID_GENERO==1){
          this.form.GENERO="MASCULINO"
        }else{
          this.form.GENERO="FEMENINO"
        }

        this.GEO.devolverDistrito(dat.respuesta.ID_DISTRITO).subscribe((dis)=>{  this.form.NOMBRE_DISTRITO= dis.NOMBRE  ;
      

        
          this.form.NOMBRE_PROVINCIA=   (this.GEO.devolverProvincia( dis.ID_PROVINCIA)).label;
        
        });
    
       
        this.mpp.actualizarDatos(this.cod_buscar);
      }
        );
        this.solipac.buscarSolicitud(this.ID_SOLICITUD).subscribe(
          (sol)=>{this.formsol=sol.respuesta
          
          
          }
        );
      
     
  }

  IniciaRegistro(e){
  
    this.verpanelregistro=true; 
    let sesion=JSON.parse(localStorage.getItem('datos'));    
    this.formatoFuat.codipress=sesion.COD_IPRESS;
    this.formatoFuat.fechasolicitud=this.form.fechasolicitud;
    this.formatoFuat.nombresypaciente=this.form.NOMBRES+' '+this.form.APELLIDO_PAT+' '+this.form.APELLIDO_PAT;

    localStorage.setItem('formatofuat',JSON.stringify(this.formatoFuat));


    localStorage.setItem('datosPacienteRegistrar',JSON.stringify(this.form))


  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
