import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng';
import { DialogService } from 'primeng/dynamicdialog';

import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadosService } from 'src/app/servicios/estados.service';
import { IpressService } from 'src/app/servicios/ipress.service';
import { RecetaService } from 'src/app/servicios/impresiones/receta.service';
import { GeografiaService } from 'src/app/servicios/maestros/geografia.service';
import * as moment from 'moment';
import { async } from '@angular/core/testing';
import { TratamientoService } from 'src/app/servicios/tratamiento.service';
import { LogService } from 'src/app/servicios/log.service';



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
    private tratamientos: TratamientoService,
    private geo: GeografiaService,private logs:LogService) { }

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
      VIA: "",
      PRESENTACION:"",
      CONCENTRACION:"",
      FF:""

    })
  }
  selectorMed() {

    this.visulizarselector = true

  }
  medicamentosele(e) {
    this.visulizarselector = false
    this.fg.controls['MEDICAMENTO'].setValue(e.MEDICAMENTO);
    this.fg.controls['COD_MEDICAMENTO'].setValue(e.COD_MEDICAMENTO);
    this.fg.controls['PRESENTACION'].setValue(e.PRESENTACION);
    this.fg.controls['CONCENTRACION'].setValue(e.CONCENTRACION);
    this.fg.controls['FF'].setValue(e.FF);
    
    this.fg.controls['ESTADO_TRATAMIENTO'].setValue(1);
    console.log(this.fg.value)
  


  }
  aniadir() {

    this.itemsreceta.push(this.fg.value);

    this.fg.reset();
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)

  }
  borra(col) {
    let index = this.itemsreceta.findIndex(dato => dato.COD_MEDICAMENTO === col.COD_MEDICAMENTO)

    this.itemsreceta.splice(index, 1)
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)
  }


  async imprimirReceta() {

    this.generaDatosJson().then((datosJson) => {

      this.recetas.mostrarReceta(
        datosJson
      )

    });








  }

  async generaDatosJson() {





    let session = JSON.parse(localStorage.getItem('datos'))

    const dato = await this.ips.getIpress(session.COD_IPRESS).toPromise()

    let distrito;
    let persona = this.estadoss.personaPaciente;

    const distri = await this.geo.devolverDistrito(dato[0].ID_DISTRITO).toPromise()
    distrito = distri;
    let nac = moment(persona.FECHA_NAC, "YYYY-MM-DD")



    var hoy = moment();
    var EDAD = hoy.diff(nac, "years");

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

    let ITEMS = this.itemsreceta.map((item) => {
      return {
        "ITEM": item.NRO_ITEM,
        "MEDICAMENTO": item.MEDICAMENTO,
        "DOSIS": item.DOSIS,
        "VIA": item.VIA,
        "FRECUENCIA": item.FRECUENCIA,
        "DURACION": item.PERIODO,
        "PRESENTACION": item.PRESENTACION,
        "CONCENTRACION": item.CONCENTRACION,
        "CANTIDAD": item.CANTIDAD,
        "FF": item.FF
      }
    })

    return {
      "receta":
      {
        "ID_ATENCION": "",
        "NOMBRE_IPRESS": dato[0].NOMBRE,
        "DIRECCION": dato[0].DIRECCION,
        "CIUDAD": distrito.NOMBRE_DISTRITO,
        "NOMBRE_COMPLETO_PACIENTE": persona.NOMBRES + ' ' + persona.APELLIDO_PAT + ' ' + persona.APELLIDO_MAT,
        "EDAD_PACIENTE": EDAD,
        "COD_ASEGURADO": "",
        "NRO_DOCUMENTO": persona.NRO_DOCUMENTO,
        "FINANCIADOR": "DEMANDA",
        "ATENCION": "ESPECIALIDAD",
        "ESPECIALIDAD": "",
        "NR0_HCL": persona.NRO_DOCUMENTO,
        "DIAGNOSTICOSlist": diagnosticos,
        "PROFESIONAL": {
          "NOMBRE_COMPLETO": PROFESIONAL.NOMBRES + ' ' + PROFESIONAL.APELLIDO_PAT + ' ' + PROFESIONAL.APELLIDO_MAT,
          "NRO_DOCUMENTO": PROFESIONAL.NRO_DOCUMENTO
        },
        "ITEMS": ITEMS
      }
    }



  }
  GuardarTratamiento(ID_ATENCION, ID_TRABAJADOR) {
    this.itemsreceta = this.itemsreceta.map((item) => { item.ID_ATENCION = ID_ATENCION; item.ID_TRABAJADOR = ID_TRABAJADOR; return item })
    this.tratamientos.guardarTratamientos(this.itemsreceta).subscribe((datos) => { console.log('se guardaron los tratamientos') },(ERROR)=>{
      this.logs.log('errores al guadar tratamiento',this.itemsreceta).subscribe();
    })

  }
  async GuardarReceta(ID_ATENCION) {
    const datosjson = await this.generaDatosJson();
    datosjson.receta.ID_ATENCION = ID_ATENCION
    this.recetas.guardarReceta(datosjson.receta).subscribe((datos) => { console.log('se guardo correctamente la receta') })
  }
  resetearreceta() {
    this.itemsreceta = [];
  }


}
