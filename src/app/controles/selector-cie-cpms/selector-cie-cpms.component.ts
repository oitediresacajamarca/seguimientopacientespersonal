import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MorbilidadesTablaItem } from 'src/app/interfaces/morbilidades-tabla-item';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-selector-cie-cpms',
  templateUrl: './selector-cie-cpms.component.html',
  styleUrls: ['./selector-cie-cpms.component.css']
})
export class SelectorCieCpmsComponent implements OnInit {


  listamorbilidades: MorbilidadesTablaItem[];

  selectedCustomers: MorbilidadesTablaItem[];
  morbilidadesselec: string[];
  public codigosSelect: string[];
  public selectioncie: any;

  statuses: any[];

  loading: boolean = true;

  @ViewChild('dt', { static: false }) table: Table;
  @Output() cambioSelecion: EventEmitter<string[]> = new EventEmitter()
  constructor(private morb: MorbilidadesService) { }
  writeValue(obj: string[]): void {
    this.codigosSelect = obj;
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  emitirCambio() {
    this.cambioSelecion.emit(this.codigosSelect)

  }

  ngOnInit() {
    this.listamorbilidades = [];

    if (this.morb.lista == null) {
      this.morb.devolverMorbilidades();
      this.morb.eventocargo.subscribe((dat) => {
        this.listamorbilidades = dat;
      })
    } else {
      this.listamorbilidades = this.morb.lista;

    }

    this.loading = false;
  }
  selecionarMob(e) {
    console.log(this.selectioncie)

    console.log(e)
  }

}
