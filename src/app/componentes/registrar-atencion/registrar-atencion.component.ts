import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ɵConsole } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { ConfirmationService, MessageService, MenuItem } from 'primeng';
import { DatosAtencionComponent } from './datos-atencion/datos-atencion.component';
import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { Atencion } from 'src/app/interfaces/atencion';
import { FormatoFuat } from 'src/app/interfaces/formato-fuat';
import { Diagnostico } from 'src/app/interfaces/diagnostico';
import { FuatServicioService } from 'src/app/servicios/formatos/fuat-servicio.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { PersonalService } from 'src/app/servicios/personal.service';
import { AtencionRegService } from 'src/app/servicios/atencion-reg.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { EstadosService } from 'src/app/servicios/estados.service';
import { LogService } from 'src/app/servicios/log.service';
import { RecetaService } from 'src/app/servicios/impresiones/receta.service';



@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  fechaatencion: Date = new Date()
  @Input() cod_paciente: string;
  @Input() ver: boolean;
  @Input() ID_PACIENTE: string;
  @Input() ID_SOLICITUD: string;
  @Input() datos_solicitud: any;
  @ViewChild('form1', { static: false }) form1: DatosAtencionComponent;
  @ViewChild('form2', { static: false }) form2: DiagnosticosComponent;
  @ViewChild('form3', { static: false }) form3: TratamientoComponent;
  @Output('completoRegistro') completoRegistro: EventEmitter<any> = new EventEmitter
  motivoAte: string;
  casocovit: boolean;
  tipocov: string;
  trabajador_id: string;
  sesion: any;
  pasos: MenuItem[];
  activo: MenuItem;
  @Input() atencion: Atencion
  @Input() datosPaciente: any
  formatofuat: FormatoFuat = this.fuatservicio.formatofuat;
  fua: string;
  es:any;

  constructor(private aten: AtencionService, private confirmationService: ConfirmationService,
    private fuatservicio: FuatServicioService, private messageService: MessageService,
    private atencionregser: AtencionRegService,
    private personals: PersonalService, private pacientes: PacienteService,
    private estadoss: EstadosService,
    private logs: LogService, private recetas: RecetaService) { }

  ngOnInit() {

    this.sesion = JSON.parse(localStorage.getItem('datos'));
    this.pasos = [{ label: "DATOS DE LA ATENCION" }, { label: "DIAGNOSTICOS" }, { label: "TRATAMIENTO Y RECOMENDACIONES" }]
    this.completoRegistro.subscribe(() => {

      this.confirmationService.confirm({
        message: 'Se guardaron los datos correctamente', accept: () => {
          this.ver = false
        }
      })
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


    this.trabajador_id = this.sesion.TRABAJADOR_ID;
    this.formatofuat = {
      codipress: "",
      diagnosticos: [],
      edad: "",
      especialidades: [],
      examendeapoyo: "",
      examenfisico:
      {
        descripciondecaso: "",
        frecuenciacardiaca: "",
        frecuenciarespi: "",
        peso: "",
        presionarterial: "",
        satO2: "",
        talla: "",
        temperatura: ""
      },
      fechaatencion: null,
      fechasolicitud: "",
      horaatencion: "",
      horasolicitud: "",
      motivo: [],
      nombreipress: "",
      nombresypaciente: "",
      nro_documento: "",
      numeroFuat: 1,
      nuevocontrol: true,
      numerocontrol: "",
      personal: { nombresyapellidos: "", colegiatura: "", profesion: "", NRO_DOCUMENTO: "" },
      recomendaciones: [],
      sexo: "",
      tiposeguro: "",
      tratamiento: ""
    }
  }



  registrarAtencion(event) {
    if (this.validarcampos().valido) {
      try {
        this.generaJsonFuat();
        this.logs.log('Fuat antes de registrar en base', this.formatofuat).subscribe();
    /*    let fecha = new Date()
        this.atencion.FECHA = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()

        this.atencion.HORA = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()*/

        this.atencion.FECHA=this.fechaatencion
        this.atencion.HORA=this.fechaatencion.toLocaleTimeString('es-ES')
        console.log(this.atencion);
        console.log(this.form1.examenesFisicos);
        console.log(this.form1.atencion_detalle);
        console.log(this.form2.diagnostabla)

        let id_atencion;

        this.confirmationService.confirm({
          message: 'Esta seguro de que deseas Guardar la Atencion',
          accept: () => {
            this.confirmationService.close()
            this.logs.log('Inicia proceso de registro de atencion en base de datos', {}).subscribe();
            this.imprimirReceta();
        

            this.form1.atencion_detalle.N_CONTROL = this.form1.numcon;
            this.personals.devolver_personal(this.sesion.id_persona, this.sesion.COD_IPRESS).subscribe((dato) => {
              let personal: any
              if (dato.rowsAffected >= 1) {
                personal = dato.recordset[0];
                this.atencion.ID_RESPONSABLE = personal.ID_TRABAJADOR_IPRESS

              }
              let personapaciente = this.estadoss.personaPaciente
              //GENERA EL PACIENTE ASI COMO SU HISTORIA CLINICA SI NO LO TUBIERA
              this.pacientes.prepararPaciente(personapaciente.ID_PERSONA, personapaciente.NRO_DOCUMENTO, this.sesion.COD_IPRESS).subscribe(
                (historiaypaciente) => {
                  this.logs.log('Se creo la historia clinica del paciente', historiaypaciente).subscribe();
                  this.atencion.ID_PACIENTE = personapaciente.ID_PERSONA;
                  this.atencion.ID_HC = historiaypaciente.historia.ID_HC

                  console.log(this.atencion);
                  this.aten.registrar(
                    this.atencion
                  ).subscribe((RESPUESTA) => {
                    this.logs.log('Se registro  la atencion :', RESPUESTA).subscribe();
                    this.formatofuat.personal.NRO_DOCUMENTO = this.sesion.id_persona
                    this.formatofuat.numeroFuat = RESPUESTA.identiti;
                    this.guardarReceta(RESPUESTA.identiti);
                    this.guardarTratamiento(RESPUESTA.identiti, this.atencion.ID_RESPONSABLE)

                    console.log('se guardara el formato fuat')


                    id_atencion = RESPUESTA.identiti;
                    this.form1.examenesFisicos.examenes.forEach(element => {
                      element.ID_TRABAJADOR = this.atencion.ID_RESPONSABLE
                    });
                    this.trabajador_id = personal.ID_TRABAJADOR_IPRESS
                    this.aten.registrarExamenfis(this.form1.examenesFisicos.examenes, id_atencion, this.trabajador_id).subscribe(() => {
                      console.log('se guardo exitosamente los examenes fisicos')
                      this.aten.registrarAtencionDetalle(this.form1.atencion_detalle, id_atencion, this.trabajador_id).subscribe(() => {
                        console.log('se guardo exitosamente atencion detalle')
                        this.aten.registrarAtencionDiagnosticos(this.form2.diagnostabla, id_atencion, this.trabajador_id).subscribe(() => {
                          console.log('se guardo exitosamente los diagnosticos')
                          let atencionreg = {
                            ID_ATENCION: id_atencion,
                            TIPO_CONSULTOR: "",
                            LOTE: "",
                            NUMERO_FUA: id_atencion,
                            ID_TRABAJADOR: this.trabajador_id,
                            COD_PRESTACIONAL: "",
                            NIVEL: 3,
                            FEC_ATENCION: this.atencion.FECHA,
                            HORA: this.atencion.HORA,
                            ID_FINANCIADOR: 1,
                            ID_UPSS: 302303

                          }

                          this.atencionregser.guardar(atencionreg).subscribe(res => {
                            console.log("se guardo correctamente la atencion reg")
                            this.logs.log('se registro correctamente la atencion', { atencion: this.atencion, diagnosticos: this.form2.diagnostabla }).subscribe()
                            this.imprimirFuat();

                            this.fuatservicio.guardarFuat(this.formatofuat).subscribe(async (res) => {
                              this.logs.log('se guardo correctamente la fuat', res).subscribe()
                              console.log('se guardo correctamente la fuat');





                              this.form3.receta.resetearreceta()
                              this.form3.trat.resetForm()

                              this.completoRegistro.emit('Se completo el Registro');
                              this.form1.datosa.resetForm()
                              this.form2.diaf.resetForm()

                              this.form2.dianosticospac = []
                              this.form2.diagnostabla = []
                              //    

                            })


                          }, (error) => { this.logs.log('errores en guardar atencionreg', atencionreg).subscribe() })
                        }, (error) => { this.logs.log('errores en guardar atencion diagnosticos', this.form2.diagnostabla).subscribe() });

                      }, (error) => { this.logs.log('errores en guardar atencion detalle', this.form1.atencion_detalle).subscribe() });


                    }, (error) => { this.logs.log('errores en guardar examenes fisicos', this.form1.examenesFisicos.examenes).subscribe() });

                  }, (ERROR) => {
                    this.messageService.add({ severity: 'danger', summary: 'error' })
                    this.logs.log('errores en guardar atencion', this.atencion).subscribe()

                  });
                }
              )



            })



          },
        })

      } catch (error) {
        this.logs.log('errores al registrar atencion', error).subscribe()
      }
    } else {

      this.messageService.add({ severity: 'error', detail: this.validarcampos().mensaje, summary: 'No se puede registrar atencion', key: 'mensajeregistro' })

    }



  }

  validarcampos() {
    let valido = { valido: true, mensaje: '' };
    if (this.form2.dianosticospac.length == 0) {
      valido.valido = false;
      valido.mensaje = 'No se a asigndo diagnosticos al paciente'
    }

    return valido;

  }
  async imprimirReceta() {
    await this.form3.receta.imprimirReceta()
  }

  async guardarTratamiento(ID_ATENCION, ID_TRABAJADOR) {
    await this.form3.receta.GuardarTratamiento(ID_ATENCION, ID_TRABAJADOR)
  }
  async guardarReceta(ID_ATENCION) {
    await this.form3.receta.GuardarReceta(ID_ATENCION)
  }
  imprimirFuat() {

    this.generaJsonFuat();
    this.fuatservicio.mostrarFuat(this.formatofuat);

  }


  generaJsonFuat() {

    this.formatofuat.codipress = this.sesion.COD_IPRESS;
    this.formatofuat.nombreipress = this.sesion.NOMBRE_IPRESS;

    if (this.estadoss.solicitud != null) {
      this.formatofuat.fechasolicitud = this.estadoss.solicitud.FECHA_SOLICITUD.substring(0, 10);
      this.formatofuat.horasolicitud = this.estadoss.solicitud.FECHA_SOLICITUD.substring(11, 20);
    }
    this.formatofuat.nombresypaciente = this.datosPaciente.NOMBRES + ' ' + this.datosPaciente.APELLIDO_PAT + ' ' + this.datosPaciente.APELLIDO_MAT;
    this.formatofuat.sexo = this.datosPaciente.GENERO.substring(0, 1);

    console.log(moment.locale('es'));
    var fn = moment(this.datosPaciente.FECHA_NAC, "YYYY-MM-DD")
    console.log(fn.toDate())


    var hoy = moment();
    var anios = hoy.diff(fn, "years");

    var timeDiff = Math.abs(Date.now() - Date.parse(this.datosPaciente.FECHA_NAC));

    this.formatofuat.edad = anios.toString()

    this.formatofuat.nro_documento = this.datosPaciente.NRO_DOCUMENTO;
    this.formatofuat.nuevocontrol = this.form1.numcon == null || this.form1.numcon < 1 ? true : false
    this.formatofuat.numerocontrol = this.form1.numcon != null ? this.form1.numcon.toString() : ""
    this.formatofuat.especialidades = [];
    this.formatofuat.examenfisico.presionarterial = this.form1.examenesFisicos.examenes[0].VALOR
    this.formatofuat.examenfisico.frecuenciacardiaca = this.form1.examenesFisicos.examenes[1].VALOR
    this.formatofuat.examenfisico.frecuenciarespi = this.form1.examenesFisicos.examenes[2].VALOR
    this.formatofuat.examenfisico.temperatura = this.form1.examenesFisicos.examenes[3].VALOR
    this.formatofuat.examenfisico.satO2 = this.form1.examenesFisicos.examenes[4].VALOR
    this.formatofuat.examenfisico.peso = this.form1.examenesFisicos.examenes[5].VALOR
    this.formatofuat.examenfisico.talla = this.form1.examenesFisicos.examenes[6].VALOR
    this.formatofuat.examenfisico.descripciondecaso = this.form1.descripcioncaso;
    this.formatofuat.tratamiento = this.form1.atencion_detalle.TRATAMIENTO_ACTUAL.toString();
    this.formatofuat.examendeapoyo = this.form1.examenesdeapoyo.toString();
    this.formatofuat.motivo[0] = this.form1.atencion_detalle.MOTIVO;
    this.formatofuat.codipress = this.sesion.COD_IPRESS;
    let actual = new Date();
    this.formatofuat.fechaatencion = actual.toLocaleDateString('es-ES')
    this.formatofuat.horaatencion = (new Date()).getHours().toString() + ':' + (new Date()).getMinutes()
    this.formatofuat.personal.nombresyapellidos = this.sesion.APELLIDO_PAT + ' ' + this.sesion.APELLIDO_MAT + ' ' + this.sesion.NOMBRES;
    this.formatofuat.personal.colegiatura = this.sesion.DATOS_PROFESIONALES.COD_COLEGIATURA
    this.formatofuat.personal.profesion = this.sesion.DATOS_PROFESIONALES.NOMBRE_PROFESION

    this.formatofuat.diagnosticos = [];

    this.form2.dianosticospac.forEach(element => {
      let diagnos: Diagnostico = { cod_diag: "", item: 1, tipo_diag: "", valor_lab: "", desc_diag: "" }
      diagnos.item = element.item;
      diagnos.cod_diag = element.cod_cie;
      diagnos.tipo_diag = element.tip_diag;
      diagnos.valor_lab = element.lab;
      diagnos.desc_diag = element.desc_diag;
      this.formatofuat.diagnosticos.push(diagnos)
    });

    this.formatofuat.recomendaciones = this.form3.recomendaciones;
  }

  selecionarForm() {
    if (this.activo == 0) {
      this.form1.visible = true

    } else {
      this.form1.visible = false;
    }

    if (this.activo == 1) {
      this.form2.visible = true

    } else {
      this.form2.visible = false;
    }
    if (this.activo == 2) {
      this.form3.visible = true

    } else {
      this.form3.visible = false;
    }





  }


}
