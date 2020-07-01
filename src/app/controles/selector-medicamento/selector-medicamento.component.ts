import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MedicamentosService } from 'src/app/servicios/medicamentos.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-selector-medicamento',
  templateUrl: './selector-medicamento.component.html',
  styleUrls: ['./selector-medicamento.component.css']
})
export class SelectorMedicamentoComponent implements OnInit {
  @Output()
  medicamentoselecionado = new EventEmitter<any>()
  constructor(private medicamentoser: MedicamentosService, private fb: FormBuilder) { }
  cols = [
    { field: "COD_MEDICAMENTO", header: "CODIGO" },
    { field: "MEDICAMENTO", header: "MEDICAMENTO" },
    { field: "PRESENTACION", header: "PRESENTACION" },
    { field: "CONCENTRACION", header: "CONCENTRACION" },
    { field: "TIPO", header: "TIPO" },
    { field: "PETITORIO", header: "PETITORIO" },
    { field: "FF", header: "FF" },

  ]
  fg: FormGroup
  medicamentos = []
  medicSelect
  ngOnInit() {
    //   this.cargarListadoMedicamentos();
    this.fg = this.fb.group({
      COD_MEDICAMENTO: '',
      MEDICAMENTO: '',
      PRESENTACION: '',
      CONCENTRACION: '',
      TIPO: '',
      PETITORIO: '',
      FF: '',
      ESTRATEGIA: '',
      ESTVTA: '',
      FECHAUPD: '',
      CODIGO_SIG: '',
      ESTADO: ''
    })
  }
  cargarListadoMedicamentos() {
    this.medicamentoser.cargarMedicamentos().subscribe((datos) => {

    })
  }
  filtrar(event) {
    if (event.target.value.length >= 4) {
      this.medicamentoser.cargarMedicamentosFiltrados(this.fg.value).subscribe((datos) => {

        this.medicamentos = datos
      })
    }
  }
  onRowSelect(event) {

    this.medicamentoselecionado.emit(this.medicSelect)
  }

}
