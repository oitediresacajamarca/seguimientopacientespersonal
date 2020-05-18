import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { DatosAtencionComponent } from './datos-atencion/datos-atencion.component';
import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { Atencion } from 'src/app/interfaces/atencion';
import { FormatoFuat } from 'src/app/interfaces/formato-fuat';
import * as jsPDF from 'jspdf'
import { Diagnostico } from 'src/app/interfaces/diagnostico';


@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  fechaatencion: Date = new Date()
  @Input() cod_paciente: string
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
  formatofuat: FormatoFuat

  constructor(private aten: AtencionService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.sesion = JSON.parse(localStorage.getItem('datos'));
    this.pasos = [{ label: "DATOS DE LA ATENCION" }, { label: "DIAGNOSTICOS" }, { label: "TRATAMIENTO Y RECOMENDACIONES" }]


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
      fechaatencion: "",
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
      personal: { nombresyapellidos: "", colegiatura: "", profesion: "" },
      recomendaciones: [],
      sexo: "",
      tiposeguro: "",
      tratamiento: ""
    }
  }



  registrarAtencion(event) {

    console.log(this.form1.examenesFisicos);
    console.log(this.form1.atencion_detalle);
    console.log(this.form2.diagnostabla)
    let id_atencion;

    this.confirmationService.confirm({
      message: 'Esta seguro de que deseas Guardar la Atencion',
      accept: () => {

        this.form1.atencion_detalle.N_CONTROL = this.form1.numcon;

        //  this.form1.atencion_detalle.MOTIVO=this.form1..toString();
        this.aten.registrar(
          this.atencion

        ).subscribe((RESPUESTA) => {
          id_atencion = RESPUESTA.respuesta.identiti;
          this.form1.examenesFisicos
          this.aten.registrarExamenfis(this.form1.examenesFisicos.examenes, id_atencion, this.trabajador_id).subscribe(() => { });
          this.aten.registrarAtencionDetalle(this.form1.atencion_detalle, id_atencion, this.trabajador_id).subscribe(() => { });
          this.aten.registrarAtencionDiagnosticos(this.form2.diagnostabla, id_atencion, this.trabajador_id).subscribe(() => { });

          this.confirmationService.confirm({ message: 'Se guardaron los datos correctamente' })
          this.completoRegistro.emit('Se completo el Registro');



        });
      }
    })


  }
  imprimirFuat() {

    this.formatofuat.codipress = this.sesion.COD_IPRESS;
    console.log(this.datosPaciente)
    //this.formatofuat.edad=this.datosPaciente.FECHA_NAC
    this.formatofuat.nombreipress = this.sesion.NOMBRE_IPRESS;
    //  this.formatofuat.fechasolicitud=this.datos_solicitud.FECHA_SOLICITUD;
    this.formatofuat.nombresypaciente = this.datosPaciente.NOMBRES + ' ' + this.datosPaciente.APELLIDO_PAT + ' ' + this.datosPaciente.APELLIDO_MAT;
    this.formatofuat.sexo = this.datosPaciente.GENERO;
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
    this.formatofuat.examenfisico.descripciondecaso = this.form1.examenesFisicos.examenes[7].VALOR
    this.formatofuat.tratamiento = this.form1.atencion_detalle.TRATAMIENTO_ACTUAL.toString();
    this.formatofuat.examendeapoyo = "";
    this.formatofuat.motivo[0] = this.form1.atencion_detalle.MOTIVO;
    this.formatofuat.codipress = this.sesion.COD_IPRESS;
    this.formatofuat.fechaatencion = (new Date()).toDateString()
    this.formatofuat.horaatencion = (new Date()).getHours().toString() + ':' + (new Date()).getMinutes()
    console.log(this.form2.dianosticospac)
    this.formatofuat.diagnosticos=[];
    this.form2.dianosticospac.forEach(element => {
      let diagnos: Diagnostico={cod_diag:"",item:1,tipo_diag:"",valor_lab:"",desc_diag:""}
      diagnos.item=element.item;
      diagnos.cod_diag = element.cod_cie;
      diagnos.tipo_diag = element.tip_diag;
      diagnos.valor_lab = element.lab;
      diagnos.desc_diag=element.desc_diag;
      this.formatofuat.diagnosticos.push(diagnos)
    });

    //this.formatofuat.diagnosticos = this.form2.dianosticospac







    var doc = new jsPDF(
      {
        orientation: 'p',
        unit: 'px',
        format: 'a4'
      }



    );

    doc.setFontSize(12);
    doc.text("ANEXO 3: FORMATO ÚNICO DE ATENCIÓN DE TELEORIENTACIÓN Y TELEMONITOREO - FUAT"
      , 20
      , 35,
      { lineHeightFactor: 0.5 });

    doc.text(" FORMATO ÚNICO DE ATENCIÓN DE TELEORIENTACIÓN Y"
      , 30
      , 55,
      { lineHeightFactor: 0.5 });


    doc.text(" TELEMONITOREO - FUAT"
      , 90
      , 65,
      { lineHeightFactor: 0.5 });

    //pdf.addImage("http://localhost:4200/assets/FUATFORMATO.jpg", "JPEG", 15, 40, 180, 180);

    doc.cell(350, 45, 20, 20, "N")
    doc.cell(370, 45, 40, 20, "120")
    doc.cell(30, 65, 380, 22, "I. SOLICITUD DE SERVICIOS (Para ser llenado por el teleorientador)")

    doc.setFontSize(10);
    doc.text("Teleorientación"
      , 50
      , 85)
    doc.setFontSize(10);
    doc.text("Telemonitoreo"
      , 250
      , 85)

    doc.cell(30, 87, 380, 16, "1. DATOS DEL PACIENTE")
    doc.cell(30, 103, 100, 50, "Nombre de IPRESS más cercana al domicilio (Establecimiento de Salud y/o Servicio Médico de Apoyo)")
    doc.cell(130, 103, 80, 50, this.formatofuat.nombreipress)
    doc.cell(210, 103, 50, 50, "Fecha que solicita el servicio")
    doc.cell(310, 103, 50, 50, "Hora que solicita el servicio")
    doc.cell(30, 153, 100, 16, "Nombres y Apellidos")
    doc.cell(130, 153, 280, 16, this.formatofuat.nombresypaciente)
    doc.cell(30, 169, 30, 16, "Edad")
    doc.cell(60, 169, 70, 16, " ")
    doc.cell(130, 169, 30, 16, "Sexo")
    doc.cell(160, 169, 25, 16, "M")
    doc.cell(185, 169, 25, 16, "F")
    doc.cell(210, 169, 19, 16, "DNI")
    doc.cell(229, 169, 29, 16, " ")
    doc.cell(258, 169, 152, 16, "TIPO DE SEGURO DEL PACIENTE")
    doc.setFontSize(8);
    doc.cell(30, 185, 160, 18, "(*) En caso de no poseer DNI, indicar Pasaporte, Carné de extranjería o Cédula de Identidad.")
    doc.cell(190, 185, 220, 18, " ")
    doc.cell(30, 203, 380, 16, "II. ATENCIÓN DEL SERVICIO DE TELEORIENTACIÓN O TELEMONITOREO")
    doc.cell(30, 219, 380, 14, "2.1 RESUMEN DE LA SOLICITUD")
    doc.cell(30, 233, 80, 16, "Nuevo")
    doc.cell(110, 233, 20, 16, " ")
    doc.cell(130, 233, 80, 16, "Control")
    doc.cell(210, 233, 50, 16, "N de Control")
    doc.cell(260, 233, 50, 16, "1")
    doc.cell(310, 233, 50, 16, "2")
    doc.cell(360, 233, 50, 16, ">2")
    doc.cell(30, 249, 380, 16, "Especificar especialidad(es):")
    doc.cell(30, 265, 80, 16, "Otros")
    doc.cell(110, 265, 20, 16, " ")
    doc.cell(130, 265, 280, 16, "Especificar")
    doc.cell(30, 281, 380, 16, "2.2 BREVE RESUMEN CLÍNICO (Antecedentes de importancia, enfermedad actual, anamnesis, examen físico, impresión diagnóstica, tratamiento actual, exámenes de apoyo al diagnóstico) PA mmHg FC x' FR x' Tº x'")
    doc.cell(30, 297, 30, 16, "PA")
    doc.cell(60, 297, 30, 16, this.formatofuat.examenfisico.presionarterial + " mmHg")
    doc.cell(90, 297, 30, 16, "FC")
    doc.cell(120, 297, 30, 16, this.formatofuat.examenfisico.frecuenciacardiaca + " X'")
    doc.cell(150, 297, 30, 16, " FR")
    doc.cell(180, 297, 30, 16, this.formatofuat.examenfisico.frecuenciarespi + "X'")
    doc.cell(210, 297, 30, 16, "T")
    doc.cell(240, 297, 30, 16, this.formatofuat.examenfisico.temperatura + " X'")
    doc.cell(270, 297, 30, 16, "SAT O2")
    doc.cell(300, 297, 30, 16, this.formatofuat.examenfisico.temperatura + " %")
    doc.cell(330, 297, 30, 16, "Peso")
    doc.cell(360, 297, 30, 16, this.formatofuat.examenfisico.peso + " Kg")
    doc.cell(390, 297, 30, 16, this.formatofuat.examenfisico.talla + "Talla")
    doc.cell(30, 313, 380, 10, "Descripcion de Caso")
    doc.cell(30, 323, 380, 10, "*Para llenar cuando se requiera información complementaria solicitada al paciente: SI LO SUPIERA")
    doc.cell(30, 333, 190, 10, "2.3 Tratamiento actual")
    doc.cell(220, 333, 190, 10, "2.4 Examenes de Apoyo al diagnostico")
    doc.cell(30, 343, 190, 10, " ")
    doc.cell(220, 343, 190, 10, " ")
    doc.cell(30, 353, 380, 18, "3. MOTIVO DE LA TELECONSULTA")
    doc.cell(30, 371, 20, 16, "1")
    doc.cell(50, 371, 360, 16, " ")
    doc.cell(30, 387, 20, 16, "2")
    doc.cell(50, 387, 360, 16, " ")
    doc.cell(30, 403, 380, 18, "4. DATOS DE LA IPRESS CONSULTORA")
    doc.cell(30, 421, 80, 36, "NOMBRES DE LA IPRESS")
    doc.cell(110, 421, 60, 36, " ")
    doc.cell(170, 421, 80, 18, "CODIGO UNICO RENIPRESS")
    doc.cell(250, 421, 160, 18, " ")
    doc.cell(170, 439, 80, 18, "FECHA Y HORA DE TELEMONITOREO")
    doc.cell(250, 439, 160, 18, " ")
    doc.cell(30, 457, 380, 18, "5.DIAGNÓSTICO (de acuerdo a las competencias del profesional que brinda el servicio)")
    doc.cell(30, 475, 20, 16, "N")
    doc.cell(50, 475, 50, 16, "CIE 10")
    doc.cell(100, 475, 310, 16, "DIAGNOSTICO")
    doc.cell(30, 491, 20, 16, "1")
    doc.cell(50, 491, 50, 16, this.formatofuat.diagnosticos[0].cod_diag)
    doc.cell(100, 491, 310, 16,this.formatofuat.diagnosticos[0].desc_diag)
    doc.cell(30, 507, 20, 16, "2")
    doc.cell(50, 507, 50, 16, this.formatofuat.diagnosticos[1].cod_diag)
    doc.cell(100, 507, 310, 16, this.formatofuat.diagnosticos[1].desc_diag)
    doc.cell(30, 523, 380, 18, "6. RECOMENDACIONES / PLAN / INDICACIONES (de acuerdo a las competencias del profesional que brinda el servicio)")
    doc.cell(30, 541, 20, 16, "1")
    doc.cell(50, 541, 360, 16, " ")
    doc.cell(30, 557, 20, 16, "2")
    doc.cell(50, 557, 360, 16, " ")
    doc.cell(30, 573, 380, 16, "7. DATOS DE TELEORIENTADOR")
    doc.cell(30, 589, 90, 16, "Nombres y Apellidos")
    doc.cell(120, 589, 90, 16, " ")
    doc.cell(30, 605, 90, 16, "Profesional de Salud /Especialidad/Subespecialidad:")
    doc.cell(120, 605, 90, 16, " ")
    doc.cell(30, 621, 90, 16, "N° Colegio profesional/RNE:")
    doc.cell(120, 621, 90, 16, " ")
    doc.cell(210, 589, 200, 48, " ")



    doc.save("dat.pdf");


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
