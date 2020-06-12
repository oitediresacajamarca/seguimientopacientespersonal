import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';
import { FormatoFuat } from 'src/app/interfaces/formato-fuat';

@Injectable({
  providedIn: 'root'
})
export class FuatServicioService {

  formatofuat: FormatoFuat={
    numeroFuat:0,
    nombresypaciente:'',
    fechasolicitud:'',
    horasolicitud:'',
    edad:'',
    sexo:'',nro_documento:'',
    tiposeguro:'',
    nuevocontrol:false,
    numerocontrol:'',
    especialidades:[],
    examenfisico:{
        presionarterial:'',
        frecuenciacardiaca:'',
        frecuenciarespi:'',
        temperatura:'',
        satO2:'',
        peso:'',
        talla:'',
        descripciondecaso:''
    },
    tratamiento:'',
    examendeapoyo:'',
    motivo:[],
    nombreipress:'',
    codipress:'',
    fechaatencion:'',
    horaatencion:'',
    diagnosticos:[],
    recomendaciones:[],
    personal:{
      nombresyapellidos:'',
      profesion:'',
      colegiatura:'',
      NRO_DOCUMENTO:''
    }




  }
  url: string;

  constructor(private http: HttpClient) { }

  mostrarFuat(datosfuat: any) {

    console.log(datosfuat)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' })
    };

    this.http.post('http://hospitalvirtual.diresacajamarca.gob.pe:8088/fuat/ver', datosfuat, { responseType: 'arraybuffer' }).subscribe(
      (datos) => {


        var blob = new Blob([datos], { type: 'application/pdf' });
        var filename = 'FORMATO_FUAT.pdf';
        FileSaver.saveAs(blob, filename);
        this.url = URL.createObjectURL(blob)



      });


  }

  guardarFuat(fuat: any) {

    return this.http.post(environment.url_backend + 'fuat/guardar', fuat)

  }
  agregarSolictud(solicitud) {
    let sol= {
      "ESTADO":'',
      "FECHA_SOLICITUD": "2020-06-03T14:21:45.090",
      "TELEF_CONTACTO": "992-705005",
      "NRO_DOCUMENTO": "71081207",
      "APELLIDO_PAT": "SALDAÑA",
      "APELLIDO_MAT": "SALDAÑA",
      "NOMBRES": "ROSSGRI PAOLA",
      "NOMBRE_IPRESS": "CHONTAPACCHA",
      "NOMBRE_PROVINCIA": "CAJAMARCA",
      "NOMBRE_DISTRITO": "CAJAMARCA",
      "DESCRIPCION": "NAUSEAS, Y VÓMITOS CONSTANTES",
      "TELEF_CONTACTO2": "60-5403   ",
      "DOMICILIO_ACTUAL": "JR. HUANCAVELICA 193",
      "CORREO2": "KAROLSALDANNA@GMAIL.COM",
      "ID_DISTRITO": "060101            ",
      "FECHA_NAC": "1996-08-29T00:00:00",
      "ID_GENERO": 2,
      "ID_SOLICITUD": 85,
      "ID_PACIENTE": 1471074,
      "cod_busqueda": "1011021011000015496",
      "COD_IPRESS": "000015496"
    }
    console.log(  solicitud)
    this.formatofuat.codipress = solicitud.COD_IPRESS;
    this.formatofuat.motivo = solicitud.DESCRIPCION;
    this.formatofuat.edad = solicitud.FECHA_NAC;
    this.formatofuat.fechasolicitud = solicitud.FECHA_SOLICITUD;
    this.formatofuat.nombreipress = solicitud.NOMBRE_IPRESS;
    this.formatofuat.nombresypaciente = solicitud.NOMBRES + ' ' + solicitud.APELLIDO_PAT + ' ' + solicitud.APELLIDO_MAT;
    this.formatofuat.sexo = solicitud.ID_GENERO == 1 ? 'MASCULINO' : 'FEMENINO';
    this.formatofuat.nro_documento= solicitud.NRO_DOCUMENTO
    this.mostrarFuat(this.formatofuat)

  }





}