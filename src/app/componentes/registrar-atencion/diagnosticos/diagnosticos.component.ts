import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { AtencionDiagnosticoItem } from 'src/app/interfaces/atencion-diagnostico-item';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.css']
})
export class DiagnosticosComponent implements OnInit {
  @Input() visible: boolean = false;
  cod_diag_selec: string;
  desc_diag_selec: string;
  tipodiag: SelectItem[];
  selectedtipdiag: string;
  dianosticospac: any[] = [];
  diagnostabla: AtencionDiagnosticoItem[] = [];
  lab_selec: string;

  constructor() { }

  ngOnInit() {
    this.tipodiag = [
      { label: " PRESUNTIVO", value: "1" },
      { label: " DEFINITIVO", value: "2" },
      { label: " REPETITIVO", value: "3" }
    ]


  }

  devolverListaCie() {


  }

  aniadediag(e) {
    let tipo = ""

    if (this.selectedtipdiag == "1") {
      tipo = "PRESUNTIVO"
    }
    if (this.selectedtipdiag == "2") {
      tipo = "DEFINITIVO"
    }
    if (this.selectedtipdiag == "3") {
      tipo = "REPETITIVO"
    }



    this.dianosticospac.push({ item: this.dianosticospac.length + 1, cod_cie: this.cod_diag_selec, tip_diag: tipo, lab: this.lab_selec })

    this.diagnostabla.push(
      {
        CODIGO_DIAGNOSTICO: this.cod_diag_selec,
        ESTADO_DIAGNOSTICO: "1", NRO_ITEM: this.dianosticospac.length, LAB_DIAGNOSTICO: this.lab_selec
        , TIPO_DIAGNOSTICO: this.selectedtipdiag, ID_ATENCION: "", ID_TRABAJADOR: ""
      })

  }


}
