import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SolicitudPacienteService } from 'src/app/servicios/solicitud-paciente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MorbilidadesPorPacienteComponent } from '../morbilidades-por-paciente/morbilidades-por-paciente.component';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { Configuracion } from 'src/app/configuracion/configuracion';
import { Atencion } from 'src/app/interfaces/atencion';
import { RegistrarAtencionComponent } from '../registrar-atencion/registrar-atencion.component';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EstadosService } from 'src/app/servicios/estados.service';
import { Button } from 'primeng/button';
import { LogService } from 'src/app/servicios/log.service';
import { MessageService } from 'primeng';
import { SelectorCarteraServiciosComponent } from 'src/app/controles/selector-cartera-servicios/selector-cartera-servicios.component';
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
  pdffuat = "file:///E:/Descargas/FORMATO_FUAT%20-%202020-06-09T170805.728.pdf"
  @ViewChild('inicioaten', { static: false }) inicioaten: NgForm
  @ViewChild('editabutton', { static: false }) editabutton: Button
  @ViewChild('guardarbutton', { static: false }) guardarbutton: Button
  @ViewChild('COD_CARTERA', { static: false }) COD_CARTERA: SelectorCarteraServiciosComponent



  nombresd = true
  apellido_patd = true;
  apellido_matd = true;
  direccion_d = true;
  verhistorial = false
  editardatosgenerales = true


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
    FECHA: new Date(),
    HORA: '',
    ANTECEDENTE: '',
    FEC_REGISTRO: '',
    NIVEL_ATENCION: '',
    CONSENTIMIENTO: '',
    ID_PACIENTE: '',
    ID_SOLICITUD: '',
    COD_CARTERA: ''
  }



  cod_buscar: string;
  ID_PACIENTE: string;
  ID_SOLICITUD: string;

  es: any;
  formulariosolicitud: FormGroup

  constructor(
    private solipac: SolicitudPacienteService, private rutaActiva: ActivatedRoute,
    private personser: PersonaService, private GEO: GeografiaService,
    private estadoss: EstadosService,
    private router: Router, private formnuilder: FormBuilder,
    private logs: LogService, private messageService: MessageService
  ) { }

  ngOnInit() {

    this.estadoss.pacienteporatender.subscribe(dato => {
      this.cod_buscar = dato;
      this.buscarParaInciciarAtencion()

    })
    this.atencion = {
      ID_ATENCION: null,
      TIPO_CONEXION: null,
      ID_MODALIDAD: null,
      ID_HC: null,
      ID_TIPO_ATENCION: null,
      ANTECEDENTE: "DOLOR DE CABEZA CON OTRAS COSAS",
      CONSENTIMIENTO: null,
      FECHA: null,
      FEC_REGISTRO: null,
      HORA: null,
      ID_PACIENTE: null,
      ID_RESPONSABLE: null,
      ID_SOLICITUD: "87",
      NIVEL_ATENCION: null,
      COD_CARTERA: ''
    }
    this.formulariosolicitud = this.formnuilder.group({
      FECHA_SOLICITUD: new FormControl(),
      DESCRIPCION: new FormControl(),
      DOMICILIO_ACTUAL: new FormControl(),
      TELEF_CONTACTO: new FormControl(),
      TELEF_CONTACTO2: new FormControl(),
      CORREO: new FormControl(),
      REFERENCIA: new FormControl(),
      COD_CARTERA: new FormControl()
    })



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
  buscarPersona() {
    this.inicioaten.resetForm();
    this.form = this.personser.getPersonaDescripcion(this.cod_buscar).subscribe(persona => {

      if (persona != null) {
        this.logs.log('buca persona', { persona: JSON.stringify(persona) }).subscribe()
        this.form = {
          "APELLIDO_PAT": persona.APELLIDO_PAT,
          "APELLIDO_MAT": persona.APELLIDO_MAT,
          "NOMBRES": persona.NOMBRES,
          "NRO_DOCUMENTO": persona.NRO_DOCUMENTO,
          "NOMBRE_PROVINCIA": persona.NOMBRE_PROVINCIA,
          "NOMBRE_DISTRITO": persona.NOMBRE_DISTRITO,
          "TELEFONO": persona.TELEFONO,
          "CORREO": persona.CORREO,
          "ID_DISTRITO": persona.ID_DISTRITO,
          "FECHA_NAC": persona.FECHA_NAC,
          "GENERO": persona.GENERO,
          "DIRECCION": persona.DIRECCION
        }

        this.estadoss.cambiopaciente.emit(persona.ID_PERSONA)
        this.estadoss.personaPaciente = persona

      }

    })


  }
  buscarParaInciciarAtencion() {

    this.buscarPersona();
    this.buscarSolicitud()
  }

  buscarSolicitud() {
    this.formulariosolicitud.reset()

    this.solipac.buscarSolicitudPorNumeroDcocumento(this.cod_buscar).subscribe(async (datos) => {
      this.COD_CARTERA.COD_IPRESS = datos.ID_IPRESS
      await this.COD_CARTERA.cargarServicios();
      if (datos != null) {
        this.formulariosolicitud.setValue(
          {
            FECHA_SOLICITUD: datos.FECHA_SOLICITUD,
            DESCRIPCION: datos.DESCRIPCION,
            DOMICILIO_ACTUAL: datos.DOMICILIO_ACTUAL,
            TELEF_CONTACTO: datos.TELEF_CONTACTO,
            TELEF_CONTACTO2: datos.TELEF_CONTACTO2,
            CORREO: datos.CORREO,
            REFERENCIA: datos.REFERENCIA,
            COD_CARTERA: datos.COD_CARTERA
          },
        )
        
        this.estadoss.solicitud = datos
        this.ID_SOLICITUD = datos.ID_SOLICITUD
      }
    })
  }

  async IniciaRegistro(e) {

    this.panreg.ver = true;
    let sesion = JSON.parse(localStorage.getItem('datos'));
    this.atencion = this.formulariosolicitud.value
    
    let valor=  this.COD_CARTERA.getNombreCarteraSeleccionada()
  this.estadoss.especialidadatender=valor
       

    this.atencion.ANTECEDENTE = this.formulariosolicitud.controls.DESCRIPCION.value
    if (this.ID_SOLICITUD != null) {
      this.atencion.ID_SOLICITUD = this.ID_SOLICITUD
    }
    this.panreg.form1.atencion_detalle.MOTIVO = this.formulariosolicitud.controls.DESCRIPCION.value;
    this.logs.log('INICIA PROCESO DE ATENCION', this.atencion).subscribe();
  }


  CerrarRegistro() {
    this.verpanelregistro = false;

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  Imprimir_Fuat() {

    this.panreg.imprimirFuat();
  }

  VerHistorial() {
    this.verhistorial = true;
  }

  BuscarDni() {

    this.router.navigate([{ outlets: { emergente: 'buscardni' } }])
  }
  editarDatos() {
    this.editardatosgenerales = true;
    this.editabutton.disabled = true;
    this.guardarbutton.disabled = false;
    this.nombresd = false;
    this.apellido_patd = false;
    this.apellido_matd = false;
    this.direccion_d = false;

  }
  guardarDatos() {
    this.personser.actualizarPersona(this.form.NRO_DOCUMENTO, this.form.APELLIDO_PAT, this.form.APELLIDO_MAT, this.form.NOMBRES, this.form.DIRECCION).subscribe(

      () => {
        this.guardarbutton.disabled = true;
        this.editabutton.disabled = false;
        this.nombresd = true;
        this.apellido_patd = true;
        this.apellido_matd = true;
        this.direccion_d = true;
      }

    )

  }


}
