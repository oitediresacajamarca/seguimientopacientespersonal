import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectorMedicamentoComponent } from 'src/app/controles/selector-medicamento/selector-medicamento.component';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder) { }

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
    
    this.itemsreceta.splice(index , 1)
    this.fg.controls['NRO_ITEM'].setValue(this.itemsreceta.length + 1)
  }

}
