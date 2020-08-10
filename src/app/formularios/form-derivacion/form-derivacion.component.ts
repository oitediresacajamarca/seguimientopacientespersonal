import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatPaginator, MatSort, MatTable, MatTableModule, MatTabHeader,
  MatHeaderRow, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef,
  MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef,

} from '@angular/material';
import { SelectorCarteraServiciosComponent } from 'src/app/controles/selector-cartera-servicios/selector-cartera-servicios.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { SolicitudService } from 'src/app/servicios/servicios/solicitud.service';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { EstadosService } from 'src/app/servicios/estados.service';
export interface PeriodicElement {
  Motivo: string;
  item: number;
  Especialidad: string;
  symbol: string;
}



@Component({
  selector: 'app-form-derivacion',
  templateUrl: './form-derivacion.component.html',
  styleUrls: ['./form-derivacion.component.css']
})
export class FormDerivacionComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private derivaciones: SolicitudesService,private estados:EstadosService) { }
  displayedColumns: string[] = ['item', 'Especialidad', 'Motivo', 'symbol'];
  datas = [];
  @Input() COD_IPRESS: string = '000004655'
  @ViewChild('selector_servicios', { static: false }) selector_servicios: SelectorCarteraServiciosComponent
  formularioServicio: FormGroup;
  @Input() ID_PACIENTE: number
  @Input() solicitud={}
  @Input() ver:boolean

  @ViewChild('tabla', { static: false }) tabla: MatTable<PeriodicElement>;

  ngOnInit() {

    //  this.selector_servicios.cargarServiciosIpress(this.COD_IPRESS)
    this.formularioServicio = this.fb.group({
      COD_CARTERA: '',
      MOTIVO: ''
    })
    console.log(this.solicitud)
  }
  ngAfterViewInit() {

    this.selector_servicios.cargarServiciosIpress(this.COD_IPRESS)

  }
  alertar() {
    console.log('alertar')
  }
  agregaDerivacion() {
    console.log(this.tabla.dataSource)
    let nombre_servicio = this.selector_servicios.getNombreCarteraSeleccionada()
    this.datas.push({
      item: this.datas.length + 1,
      Especialidad: nombre_servicio,
      Motivo: this.formularioServicio.value.MOTIVO,
      symbol: '',
      COD_CARTERA: this.formularioServicio.value.COD_CARTERA

    })
    // this.tabla.dataSource=this.datas


    this.tabla.renderRows();
  }

  elimnarDerivacion(item) {

    this.datas = this.datas.filter((elemento) => { return elemento.item != item })
    this.datas = this.datas.map((dato, index) => { dato.item = index + 1; return dato })
    this.tabla.renderRows();
  }
  GuardarDerivacion() {
    let body: any = {}
    body.derivaciones = this.datas;
    console.log(this.estados.personaPaciente)
    body.ID_PACIENTE = this.estados.personaPaciente.ID_PERSONA
    body.solicitud=this.solicitud
   
    this.derivaciones.nuevaDerivacion(body).subscribe((respuesta) => { console.log(respuesta) })

  }
}
