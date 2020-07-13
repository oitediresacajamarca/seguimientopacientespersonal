import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { AtencionDiagnosticoItem } from 'src/app/interfaces/atencion-diagnostico-item';

import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { NgForm } from '@angular/forms';
import { EstadosService } from 'src/app/servicios/estados.service';
import { MessageService } from 'primeng/api';

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

  @ViewChild('diaf', { static: false }) diaf: NgForm

  constructor(private morb: MorbilidadesService, private estadoss: EstadosService,private messageService: MessageService) { }

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
    if(tipo!=""){

    this.dianosticospac.push({ item: this.dianosticospac.length + 1, cod_cie: this.cod_diag_selec, desc_diag: this.desc_diag_selec, tip_diag: tipo, lab: this.lab_selec })

    this.estadoss.dianosticospac = this.dianosticospac

    this.diagnostabla.push(
      {
        CODIGO_DIAGNOSTICO: this.cod_diag_selec,
        ESTADO_DIAGNOSTICO: "1", NRO_ITEM: this.dianosticospac.length, LAB_DIAGNOSTICO: this.lab_selec
        , TIPO_DIAGNOSTICO: this.selectedtipdiag, ID_ATENCION: "", ID_TRABAJADOR: "", DESC_DIAGNOSTICO: this.desc_diag_selec
      })
    }else{
      this.messageService.add({severity:'error', key:'myKey2',summary:'Error', detail:'Debe de asignar un tipo de diagnostico'});

    }

  }
  cargarCieDesc(e) {
    this.morb.devolverMorbilidad(e.target.value).subscribe(data => {

      this.desc_diag_selec = data.respuesta.Descripcion_Item;

    })

  }
  eliminarDiagnosticoPaciente(diagnos) {

    let lugar = this.dianosticospac.findIndex((element) => { element.cod_cie == diagnos.cod_cie })
    this.dianosticospac.splice(lugar, 1);
    this.diagnostabla.splice(lugar, 1)

  }
  mostrar() {
 
  }
  agregarCie(e) {
    console.log(e)
    this.cod_diag_selec = e.Codigo_Item;
    this.desc_diag_selec = e.Descripcion_Item;
  }


}
