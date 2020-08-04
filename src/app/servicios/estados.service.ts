import { Injectable, EventEmitter } from '@angular/core';
import { Receta } from '../interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  cod_con:string;
  verificoform= new EventEmitter<any>()
  actualizarNotificacione= new EventEmitter<any>()
  actualizarUsuarios=new EventEmitter<any>();
  actualizarPerfil
  cambiopaciente= new EventEmitter<any>()
  pacienteporatender=new EventEmitter<any>()
  personaPaciente
  dianosticospac
  solicitud
  especialidadatender:string
  NombreFinanciador:string ="S.I.S"
  COD_FINANCIADOR

 

  ticketreceta: Receta = {
    NOMBRE_IPRESS: "HOSPITAL SOTO CADENILLAS",
    DIRECCION: "JR LAS PALEMERAS 234",
    CIUDAD: "JAEN",
    NOMBRE_COMPLETO_PACIENTE: "KARLA BUSTAMENTE DIAS",
    EDAD_PACIENTE: "30",
    COD_ASEGURADO: "289382",
    NRO_DOCUMENTO: "42671782",
    FINANCIADOR: "DEMANDA",
    ATENCION: "ESPECIALIDAD",
    ESPECIALIDAD: "NEUROLOGIA",
    NR0_HCL: "43247706",
    DIAGNOSTICOSlist: [{
      NRO_ITEM: "1",
      COD_DIAGNOSTICO: "z298",
      TIPO: "presuntivo",
      DIAGNOSTICO: "sumnistro de micronutrientes"
    }],
    PROFESIONAL: {
      NOMBRE_COMPLETO: "EDWARD HENRY MUNDACA VIDARTE",
      NRO_DOCUMENTO: "76178929"
    },

    ITEMS: [{
      ITEM: "1",
      MEDICAMENTO: "CAFEINA + CLORFENAMINA +   PARACETAMOL",
      DOSIS: "1 pastilla",
      VIA: "ORAL",
      FRECUENCIA: "1",
      DURACION: "2 DIAS",
      PRESENTACION: "sobre",
      CONCENTRACION: "3mg",
      CANTIDAD: "12",
      FF: "TABLETA",


    },
    {
      ITEM: "2",
      MEDICAMENTO: "CAFEINA + CLORFENAMINA +   PARACETAMOL",
      DOSIS: "1 pastilla",
      VIA: "ORAL",
      FRECUENCIA: "1",
      DURACION: "2 DIAS",
      PRESENTACION: "sobre",
      CONCENTRACION: "3mg",
      CANTIDAD: "12",
      FF: "TABLETA",


    }]

  }
  actualiza_cantidad_noti =new EventEmitter<any>();


  constructor() { }
}
