import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectorMedicamentoComponent } from 'src/app/controles/selector-medicamento/selector-medicamento.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadosService } from 'src/app/servicios/estados.service';
import { IpressService } from 'src/app/servicios/ipress.service';
import { RecetaService } from 'src/app/servicios/impresiones/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
  providers: [DialogService],



})
export class RecetaComponent implements OnInit {
  visulizarselector: boolean = false
  itemsreceta: any[] = []
  fg: FormGroup
  constructor(private confirmationService: ConfirmationService,
    private fb: FormBuilder, private estadoss: EstadosService,
    private ips: IpressService, private recetas: RecetaService) { }

  ngOnInit() {
    this.fg = this.fb.group({
      MEDICAMENTO: "",
      ID_TRATAMIENTO: null,
      ID_ATENCION: null,
      NRO_ITEM: 1,
      DESCRIPCION: '',
      ID_TRABAJADOR: null,
      ESTADO_TRATAMIENTO: null,
      CANTIDAD: null,
      FRECUENCIA: "",
      PERIODO: "",
      COD_MEDICAMENTO: "",
      DOSIS: "",
      VIA: ""

    })
  }
  selectorMed() {

    this.visulizarselector = true
    /*
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            //Actual logic to perform a confirmation
          }
        });
    */
  }
  medicamentosele(e) {
    this.visulizarselector = false
    this.fg.controls['MEDICAMENTO'].setValue(e.MEDICAMENTO)
    console.log(e)

  }
  aniadir() {
    this.itemsreceta.push(this.fg.value);

    this.fg.reset();
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)

  }
  borra(col) {

    console.log(col)
    console.log(this.itemsreceta)
    let index = this.itemsreceta.findIndex(dato => dato.COD_MEDICAMENTO === col.COD_MEDICAMENTO)

    this.itemsreceta.splice(index, 1)
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)
  }


  imprimirReceta() {
    //  this.estadoss.ticketreceta.CIUDAD=

    let session = JSON.parse(localStorage.getItem('datos'))
    session.COD_IPRESS
    this.ips.getIpress(session.COD_IPRESS).subscribe((dato) => {

    /*  this.estadoss.ticketreceta.DIRECCION = dato[0].DIRECCION
      this.estadoss.ticketreceta.NOMBRE_IPRESS = dato[0].NOMBRE_IPRESS
      this.estadoss.ticketreceta.NOMBRE_COMPLETO_PACIENTE = this.estadoss.personaPaciente.NOMBRES + ' ' + this.estadoss.personaPaciente.APELLIDO_PAT
      this.estadoss.ticketreceta.COD_ASEGURADO = '';
      var mywindow = window.open('http://localhost:4200/seguimientopacientespersonal/recetaprint', 'PRINT', 'height=800,width=1200');
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();*/
      this.recetas.mostrarReceta(
        {
          "receta":
          {
            "NOMBRE_IPRESS": "HOSPITAL SOADENILLAS",
            "DIRECCION": "JR LAS PALEMERAS 234",
            "CIUDAD": "JAEN",
            "NOMBRE_COMPLETO_PACIENTE": "KARLA BUSTAMENTE DIAS",
            "EDAD_PACIENTE": "30",
            "COD_ASEGURADO": "289382",
            "NRO_DOCUMENTO": "42671782",
            "FINANCIADOR": "DEMANDA",
            "ATENCION": "ESPECIALIDAD",
            "ESPECIALIDAD": "NEUROLOGIA",
            "NR0_HCL": "43247706",
            "DIAGNOSTICOSlist": [{
              "NRO_ITEM": "1",
              "COD_DIAGNOSTICO": "z298",
              "TIPO": "presuntivo",
              "DIAGNOSTICO": "sumnistro de micronutrientes"
            }],
            "PROFESIONAL": {
              "NOMBRE_COMPLETO": "EDWARD HENRY MUNDACA VIDARTE",
              "NRO_DOCUMENTO": "76178929"
            },

            "ITEMS": [{
              "ITEM": "1",
              "MEDICAMENTO": "CAFEINA + CLORFENAMINA +   PARACETAMOL",
              "DOSIS": "1 pastilla",
              "VIA": "ORAL",
              "FRECUENCIA": "1",
              "DURACION": "2 DIAS",
              "PRESENTACION": "sobre",
              "CONCENTRACION": "3mg",
              "CANTIDAD": "12",
              "FF": "TABLETA"


            },
            {
              "ITEM": "2",
              "MEDICAMENTO": "CAFEINA + CLORFENAMINA +   PARACETAMOL",
              "DOSIS": "1 pastilla",
              "VIA": "ORAL",
              "FRECUENCIA": "1",
              "DURACION": "2 DIAS",
              "PRESENTACION": "sobre",
              "CONCENTRACION": "3mg",
              "CANTIDAD": "12",
              "FF": "TABLETA"


            }
            ]

          }
        }
      )

    })



  }

}
