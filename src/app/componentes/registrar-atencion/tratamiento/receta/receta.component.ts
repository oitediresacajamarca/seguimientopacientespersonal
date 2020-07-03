import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectorMedicamentoComponent } from 'src/app/controles/selector-medicamento/selector-medicamento.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadosService } from 'src/app/servicios/estados.service';
import { IpressService } from 'src/app/servicios/ipress.service';
import { RecetaService } from 'src/app/servicios/impresiones/receta.service';
import { GeografiaService } from 'src/app/servicios/maestros/geografia.service';
import * as moment from 'moment';



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
  @Output() preparaReceta = new EventEmitter()
  constructor(private confirmationService: ConfirmationService,
    private fb: FormBuilder, private estadoss: EstadosService,
    private ips: IpressService, private recetas: RecetaService,
    private geo: GeografiaService) { }

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

  }
  medicamentosele(e) {
    this.visulizarselector = false
    this.fg.controls['MEDICAMENTO'].setValue(e.MEDICAMENTO)


  }
  aniadir() {
    this.itemsreceta.push(this.fg.value);

    this.fg.reset();
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)

  }
  borra(col) {

    console.log(col)
    
    let index = this.itemsreceta.findIndex(dato => dato.COD_MEDICAMENTO === col.COD_MEDICAMENTO)

    this.itemsreceta.splice(index, 1)
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)
  }


  imprimirReceta() {
    //  this.estadoss.ticketreceta.CIUDAD=

    let session = JSON.parse(localStorage.getItem('datos'))

    this.ips.getIpress(session.COD_IPRESS).subscribe(async (dato) => {

      /*  this.estadoss.ticketreceta.DIRECCION = dato[0].DIRECCION
        this.estadoss.ticketreceta.NOMBRE_IPRESS = dato[0].NOMBRE_IPRESS
        this.estadoss.ticketreceta.NOMBRE_COMPLETO_PACIENTE = this.estadoss.personaPaciente.NOMBRES + ' ' + this.estadoss.personaPaciente.APELLIDO_PAT
        this.estadoss.ticketreceta.COD_ASEGURADO = '';
        var mywindow = window.open('http://localhost:4200/seguimientopacientespersonal/recetaprint', 'PRINT', 'height=800,width=1200');
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();*/

      let distrito;
      let persona = this.estadoss.personaPaciente;
      await this.geo.devolverDistrito(dato[0].ID_DISTRITO).subscribe((distri) => {
        distrito = distri;

        let EDAD = moment(persona.FECHA_NAC, "DD-MM-YYYY").fromNow().split(" ")[1];
        let diagnosticos = this.estadoss.dianosticospac.map(
          diagnos => {
            return {
              NRO_ITEM: diagnos.item,
              COD_DIAGNOSTICO: diagnos.cod_cie,
              TIPO: diagnos.tip_diag,
              DIAGNOSTICO: diagnos.desc_diag
            }

          });
        

        let PROFESIONAL = JSON.parse(localStorage.getItem('datos'));
        console.log(this.itemsreceta)
        let ITEMS=this.itemsreceta.map((item)=>{return    {
          "ITEM": item.NRO_ITEM,
          "MEDICAMENTO": item.MEDICAMENTO,
          "DOSIS":item.DOSIS ,
          "VIA": item.VIA,
          "FRECUENCIA": item.FRECUENCIA,
          "DURACION": item.PERIODO,
          "PRESENTACION": "sobre",
          "CONCENTRACION": "3mg",
          "CANTIDAD": item.CANTIDAD,
          "FF": "TABLETA"
        } })
        this.recetas.mostrarReceta(
          {
            "receta":
            {
              "NOMBRE_IPRESS": dato[0].NOMBRE,
              "DIRECCION": dato[0].DIRECCION,
              "CIUDAD": distrito.NOMBRE_DISTRITO,
              "NOMBRE_COMPLETO_PACIENTE": persona.NOMBRES + ' ' + persona.APELLIDO_PAT + ' ' + persona.APELLIDO_MAT,
              "EDAD_PACIENTE": EDAD,
              "COD_ASEGURADO": "289382",
              "NRO_DOCUMENTO": persona.NRO_DOCUMENTO,
              "FINANCIADOR": "DEMANDA",
              "ATENCION": "ESPECIALIDAD",
              "ESPECIALIDAD": "NEUROLOGIA",
              "NR0_HCL": persona.NRO_DOCUMENTO,
              "DIAGNOSTICOSlist": diagnosticos,
              "PROFESIONAL": {
                "NOMBRE_COMPLETO": PROFESIONAL.NOMBRES + ' ' + PROFESIONAL.APELLIDO_PAT + ' ' + PROFESIONAL.APELLIDO_MAT,
                "NRO_DOCUMENTO": PROFESIONAL.NRO_DOCUMENTO
              },

              "ITEMS": ITEMS

            }
          }
        )



      })




    })



  }
  resetearreceta(){
    this.itemsreceta=[];
  }

}
