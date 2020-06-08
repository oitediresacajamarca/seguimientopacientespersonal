import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudPacienteService } from 'src/app/servicios/solicitud-paciente.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MorbilidadesPorPacienteComponent } from '../morbilidades-por-paciente/morbilidades-por-paciente.component';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';

import { Configuracion } from 'src/app/configuracion/configuracion';
import { Atencion } from 'src/app/interfaces/atencion';
import { RegistrarAtencionComponent } from '../registrar-atencion/registrar-atencion.component';
declare var $: any

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})

export class PrincipalComponent implements OnInit {
  sideBarOpen: boolean = false;
  @ViewChild('mpp', { static: false }) mpp: MorbilidadesPorPacienteComponent;
  verpanelregistro: boolean = false;


  formsol: any =
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
      "ID_SOLICITUD": ''
    };
  form: any = {
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
    "ID_SOLICITUD": ''
  };
  @ViewChild('panreg', { static: false }) panreg: RegistrarAtencionComponent
  atencion: Atencion = {
    ID_ATENCION: '',
    TIPO_CONEXION: '',
    ID_MODALIDAD: '',
    ID_HC: '',
    ID_TIPO_ATENCION: '',
    ID_RESPONSABLE: '',
    FECHA: '',
    HORA: '',
    ANTECEDENTE: '',
    FEC_REGISTRO: '',
    NIVEL_ATENCION: '',
    CONSENTIMIENTO: '',
    ID_PACIENTE: '',
    ID_SOLICITUD: ''
  }



  
  cod_buscar: string;
  ID_PACIENTE: string;
  ID_SOLICITUD: string;

  es: any;

  constructor(private solipac: SolicitudPacienteService, private rutaActiva: ActivatedRoute, private personser: PersonaService, private GEO: GeografiaService) { }

  ngOnInit() {

    this.atencion={
      ID_ATENCION: null, 
      TIPO_CONEXION:null, 
      ID_MODALIDAD: null, 
      ID_HC: null, 
      ID_TIPO_ATENCION: null,
      ANTECEDENTE: "DOLOR DE CABEZA CON OTRAS COSAS",
      CONSENTIMIENTO: null,
      FECHA: null,
      FEC_REGISTRO:null,
      HORA: null,
      ID_PACIENTE: null,
      ID_RESPONSABLE: null,
      ID_SOLICITUD: "87",
      NIVEL_ATENCION: null           
      }


    this.cod_buscar = this.rutaActiva.snapshot.params.ID_PACIENTE;
    this.es = (new Configuracion()).es

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.cod_buscar = params.NRO_DOCUMENTO;
        this.ID_PACIENTE = params.ID_PACIENTE;
        this.ID_SOLICITUD = params.ID_SOLICITUD
      }
    );

  }

  buscarSolicitud() {

    this.personser.devolverPersonaPaciente('1', this.cod_buscar).subscribe((dat) => {

      this.form = dat.respuesta;
      console.log(dat.respuesta)
      if (dat.respuesta.ID_GENERO == 1) {
        this.form.GENERO = "MASCULINO"
      } else {
        this.form.GENERO = "FEMENINO"
      }
      this.atencion.ID_PACIENTE = dat.respuesta.ID_PERSONA;
      this.atencion.ID_MODALIDAD = "5";
      this.atencion.ID_HC = "1";
      this.atencion.ID_TIPO_ATENCION = "4";
      this.atencion.ID_SOLICITUD = this.ID_SOLICITUD
      this.GEO.devolverDistrito(dat.respuesta.ID_DISTRITO).subscribe((dis) => {
        this.form.NOMBRE_DISTRITO = dis.NOMBRE;
        this.form.NOMBRE_PROVINCIA = (this.GEO.devolverProvincia(dis.ID_PROVINCIA)).label;

      });


      this.mpp.actualizarDatos(this.cod_buscar);
    }
    );
    this.solipac.buscarSolicitud(this.ID_SOLICITUD).subscribe(
      (sol) => {

        this.formsol = sol.respuesta

        this.atencion.ID_SOLICITUD = sol.respuesta.ID_SOLICITUD
        this.atencion.ANTECEDENTE = sol.respuesta.DESCRIPCION


      }
    );


  }

  IniciaRegistro(e) {


    this.panreg.ver = true;
    let sesion = JSON.parse(localStorage.getItem('datos'));
    this.atencion.ID_RESPONSABLE = sesion.TRABAJADOR_ID;
    this.panreg.form1.atencion_detalle.MOTIVO = this.formsol.DESCRIPCION;







  }
  CerrarRegistro() {
    this.verpanelregistro = false;

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
