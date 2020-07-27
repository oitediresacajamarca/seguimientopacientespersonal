import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { SelectItem } from 'primeng';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-selector-geografico-vertical',
  templateUrl: './selector-geografico-vertical.component.html',
  styleUrls: ['./selector-geografico-vertical.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorGeograficoVerticalComponent),
      multi: true
    }
  ]
})
export class SelectorGeograficoVerticalComponent implements OnInit, ControlValueAccessor {
  ID_DISTRITO: string;
  desabilitado: boolean;

  constructor(private geos: GeografiaService, private formbuilder: FormBuilder) { }
  writeValue(value: any): void {
    this.ID_DISTRITO = value
    this.cargarDistrito(this.ID_DISTRITO)
  }
  onChange: (value) => void;
  onTouched: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.desabilitado = isDisabled
  }
  PROVINCIAS: SelectItem[]
  formgeografico: FormGroup
  @Output()
  seleccionoDistrito = new EventEmitter()


  DISTRITOS_FILTRADOS

  async filtrarDistritos() {
    let COD_PROVINCIA = this.formgeografico.controls['PROVINCIA'].value.value

    this.geos.devolverDistritos(COD_PROVINCIA).subscribe((distritos) => {
      this.DISTRITOS_FILTRADOS = distritos.respuesta;
    })
  }

  distritoCambio() {
    let DISTRITO = this.formgeografico.controls['DISTRITO'].value
    this.onChange(DISTRITO)

  }
  ngOnInit() {

    this.PROVINCIAS = [
      { label: "CAJAMARCA", value: "0601" },
      { label: "CAJABAMBA", value: "0602" },
      { label: "CELENDIN", value: "0603" },
      { label: "CHOTA", value: "0604" },
      { label: "CONTUMAZA", value: "0605" },
      { label: "CUTERVO", value: "0606" },
      { label: "HUALGAYOC", value: "0607" },
      { label: "JAEN", value: "0608" },
      { label: "SAN IGNACIO", value: "0609" },
      { label: "SAN MARCOS", value: "0610" },
      { label: "SAN MIGUEL", value: "0611" },
      { label: "SAN PABLO", value: "0612" },
      { label: "SANTA CRUZ", value: "0613" }]
    this.formgeografico = this.formbuilder.group({
      PROVINCIA: '',
      DISTRITO: ''
    })
  }
  cargarDistrito(cod_distrito: string) {
    this.geos.devolverDistrito(cod_distrito).subscribe(async (distrito) => {
      let PROVINCIA = this.PROVINCIAS.find((prov) => { return prov.value == distrito.ID_PROVINCIA })
      this.formgeografico.controls['PROVINCIA'].setValue(PROVINCIA)
      await this.filtrarDistritos()
      this.formgeografico.controls['DISTRITO'].setValue(distrito.ID_DISTRITO)
    })
  }

}
