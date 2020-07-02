import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-ticket-receta',
  templateUrl: './ticket-receta.component.html',
  styleUrls: ['./ticket-receta.component.css']
})
export class TicketRecetaComponent implements OnInit {

  constructor(private estadoss: EstadosService) { }

  ngOnInit() {
    this.receta.NOMBRE_IPRESS = this.estadoss.ticketreceta.NOMBRE_IPRESS
    this.receta.DIRECCION=this.estadoss.ticketreceta.DIRECCION
  }


  receta: Receta = {
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


  
  imprime() {
    /* let divi = document.getElementById('receta')
     html2canvas(divi).then((canvas) => {
     let urlcanvas=  canvas.toDataURL('img/png');
 
     let js = new jsPDF('p','mm','a5')
     js.addImage(urlcanvas,'JPEG',0,0,148,210)
     //  printJS('receta', 'html')
     js.save();
 
     })
 */


  }

}
