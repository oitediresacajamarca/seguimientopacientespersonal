import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { SolicitudService } from 'src/app/servicios/servicios/solicitud.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgForm, Form } from '@angular/forms';
import { Button } from 'primeng/button/button';
import { EstadosService } from 'src/app/servicios/estados.service';



@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  tiposdoc: SelectItem[];
  optionsMap: any;
  ipressFiltrados: SelectItem[];
  ipress_select: SelectItem;
  msgs: any[];
  verpanelregistro: boolean = false;
  noexistepaciente: boolean = false;

  fechasolicitud: Date = new Date();
  provincias: SelectItem[];
  provinciaselecionada: string;
  distritos: SelectItem[];
  verpaneldatosgenerales: boolean = false;
  generos: SelectItem[];
  verpanellogin: boolean = false;
  nombres_nuevo: string;
  ape_pat_nuevo: string;
  ape_mat_nuevo: string;
  generosele: string;
  tipodocseleccionado: string;
  numerodoc: string;
  FECNAC: Date;
  distritoselecionado: string;
  direccion: string;
  desabiltbot: boolean = true;
  aceptocon: boolean = false;

  obsevaciones: string;
  telefcon1: string;
  telefcon2: string;
  correo: string;
  es: any;
  letrasyespacio: RegExp = /[a-zA-Z ]/;
  vermensajeconfirmacion: boolean = false;
  @ViewChild('datosgenerales', { static: false })
  datosgenerales: NgForm;
  @ViewChild('solicitud', { static: false })
  solicitud: NgForm;
  @ViewChild('btenv', { static: false })
  btenv: Button

  constructor(private est: EstadosService, private pers: PersonaService, private geo: GeografiaService, private sol: SolicitudService, private confirmationService: ConfirmationService, private mesgs: MessageService) { }

  ngOnInit() {
    this.optionsMap = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };

    this.est.verificoform.subscribe((dat) => {

      this.verpanelregistro = dat.verpanelregistro;
      this.verpaneldatosgenerales = dat.verpaneldatosgenerales;
      this.FECNAC=dat.FECNAC;
      this.tipodocseleccionado=dat.tipodocseleccionado;
      this.numerodoc=dat.numerodoc;
      console.log(this.verpaneldatosgenerales)

    })


    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "MI", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.tiposdoc = [
      { label: 'DNI', value: '1' },
      { label: 'CARNET', value: '2' },
      { label: 'PASS', value: '3' }
    ]
    this.generos = [
      { label: 'MASCULINO', value: '1' },
      { label: 'FEMENINO', value: '2' }
    ]
    this.msgs = [];

    this.provincias = [
      { label: "CAJAMARCA", value: "0601" },
      { label: "CAJABAMBA", value: "0602" },
      { label: "CELENDIN", value: "0603" },
      { label: "CHOTA", value: "0604" },
      { label: "CONTUMAZA", value: "0605" },
      { label: "CUTERVO", value: "0606" },
      { label: "HUALGAYOC", value: "0607" },
      { label: "JAEN", value: "0608" },
      { label: "SAN IGNACIO", value: "0609" },
      { label: "SAN MARCOS", value: "0610" },
      { label: "SAN MIGUEL", value: "0611" },
      { label: "SAN PABLO", value: "0612" },
      { label: "SANTA CRUZ", value: "0613" }]

  }


  cambioProvincia() {

    this.geo.devolverDistritos(this.provinciaselecionada).subscribe((dat) => { this.distritos = dat.respuesta });
  }
  resetearData() {
    this.nombres_nuevo = '';
    this.ape_mat_nuevo = '';
    this.ape_pat_nuevo = '';
    this.numerodoc = '';
    this.FECNAC = null;
    this.telefcon1 = null;
    this.telefcon2 = null;
    this.correo = null;
    this.obsevaciones = null;
    this.direccion = null;

  }
  manejarPanel(event) {

    this.verpanelregistro = event.verpanelregistro;
    this.verpaneldatosgenerales = event.verpaneldatosgenerales;
  }


  guardarPaciente() {

    this.confirmationService.confirm({
      message: 'ESTAS SEGURO DE REGISTRARTE PARA SOLICITAR ATENCION?',
      key:'final',
      accept: () => {

        let solic =
        {
          "ID_TIPOD": this.tipodocseleccionado,
          "NRO_DOCUMENTO": this.numerodoc,
          "DESCRIPCION": this.obsevaciones.toLocaleUpperCase(),
          "TELEF_CONTACTO": this.telefcon1,
          "TELEF_CONTACTO2": this.telefcon2,
          "DOMICILIO_ACTUAL": this.direccion.toLocaleUpperCase(),
          "FECHA_SOLICITUD": this.fechasolicitud,
          "ESTADO": "P",
          "ID_DISTRITO": this.distritoselecionado,
          "CORREO": this.correo.toLocaleLowerCase()
        }

        if (this.verpaneldatosgenerales) {

          let PER = {
            "ID_PERSONA": this.tipodocseleccionado + this.numerodoc,
            "ID_TIPOD": this.tipodocseleccionado,
            "NRO_DOCUMENTO": this.numerodoc,
            "ID_GENERO": this.generosele,
            "NOMBRES": this.nombres_nuevo.toLocaleUpperCase(),
            "APELLIDO_PAT": this.ape_pat_nuevo.toLocaleUpperCase(),
            "APELLIDO_MAT": this.ape_mat_nuevo.toLocaleUpperCase(),
            "ID_DISTRITO": this.distritoselecionado,
            "FECHA_NAC": this.FECNAC
          };
          this.pers.guardarPersona({ root: PER }).subscribe((dat) => {


            this.sol.guardarSolicitud({ root: solic }).subscribe((solicito) => {

              // this.vermensajeconfirmacion=true;
              this.confirmationService.confirm({
                message: 'Su solicitud ha sido guardada exitosamente Pronto el personal medico se comunicara con usted segun la informacion proporcionada',
                accept: () => {
                  this.verpanelregistro = false;
                  this.resetearData();
                }, key: 'final'


              });
            });
          });

        }

        else {


          this.sol.guardarSolicitud({ root: solic }).subscribe((solicito) => {

            //   this.vermensajeconfirmacion=true;


            this.confirmationService.confirm({
              message: 'Su solicitud ha sido guardada exitosamente Pronto el personal medico se comunicara con usted segun la informacion proporcionada',
              accept: () => {
                this.verpanelregistro = false;
                this.resetearData();
              }, key: 'final'

            });


          });

        }

        this.mesgs.add({ severity: 'info', summary: 'Info Message', detail: 'Se agrego la solicitud de atencion pronto nos comunicaremos con usted', key: 'final' });


      }
    })



  }

  cancelarSolicitud() {
    this.verpanelregistro = false;
    this.resetearData();

  }
  cambiadis() {

    this.cambiaform()
    this.cargar_esta_cerc();
  }
  cambiaform() {

    this.desabiltbot = true;
    if (this.verpaneldatosgenerales && this.aceptocon && this.datosgenerales.valid && this.solicitud.valid) {
      this.desabiltbot = false;
    }
    if (this.verpaneldatosgenerales == false && this.aceptocon && this.solicitud.valid) {
      this.desabiltbot = false;
    }






  }
  validarcheck(e) {

    if (e == "acepto") {
      this.aceptocon = true;

    }
    else {
      this.aceptocon = false;
    }

    this.cambiaform();

  }

  cargar_esta_cerc() {
    this.geo.devolverIpress(this.distritoselecionado).subscribe((datos) => {

      this.ipressFiltrados = [];


      this.ipressFiltrados = datos.respuesta;
    })

  }



}
