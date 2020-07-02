import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Examenfisico } from 'src/app/interfaces/examenfisico';
import { AtencionDetalle } from 'src/app/interfaces/atencion-detalle';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-datos-atencion',
  templateUrl: './datos-atencion.component.html',
  styleUrls: ['./datos-atencion.component.css']
})
export class DatosAtencionComponent implements OnInit {
  @ViewChild('datosa', { static: false })
  datosa: NgForm
  tipocon: any;
  mostrarnumero: boolean;
  tratamientoactual: string[]
  examenesdeapoyo: string[] = []
  numcon: number;
  descripcioncaso: string = ""
  @Input()
  visible: boolean;
  @ViewChild('form1dat', { static: false }) form1dat: NgForm;
  examenesFisicos: Examenfisico = {
    examenes: [
      {
        COD_EXAMEN_FIS: "1",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: "",
        ID_TRABAJADOR: "",
        NRO_ITEM: "1",
        VALOR: ""
      },
      {
        COD_EXAMEN_FIS: "2",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "2",
        VALOR: ""
      },
      {
        COD_EXAMEN_FIS: "3",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "3",
        VALOR: ""
      },
      {
        COD_EXAMEN_FIS: "4",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "4",
        VALOR: ""
      },
      {
        COD_EXAMEN_FIS: "5",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "5",
        VALOR: ""
      }, {
        COD_EXAMEN_FIS: "6",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "6",
        VALOR: ""
      },
      {
        COD_EXAMEN_FIS: "7",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "7",
        VALOR: ""
      }, {
        COD_EXAMEN_FIS: "9",
        ESTADO: "1",
        FEC_REG: "",
        ID_ATENCION: "",
        ID_EXAMEN_FISICO_ATENCION: ""
        , ID_TRABAJADOR: "",
        NRO_ITEM: "9",
        VALOR: ""
      }


    ]
  };
  atencion_detalle: AtencionDetalle = { MOTIVO: "", N_CONTROL: 0, TRATAMIENTO_ACTUAL: "" }

  constructor() { }
  selecciondeEA() {
    this.examenesFisicos.examenes[7].VALOR = this.examenesdeapoyo.toString()
  }

  ngOnInit() {
  }
  controlarentrada(e) {

    if (this.tipocon == 'control') {
      this.mostrarnumero = true;
      this.atencion_detalle.N_CONTROL = this.numcon

    } else {
      this.mostrarnumero = false
      this.atencion_detalle.N_CONTROL = 0
      this.numcon = null
    }

  }
  selecciondeTratamientos() {
    this.atencion_detalle.TRATAMIENTO_ACTUAL = this.tratamientoactual.toString()
  }

}
