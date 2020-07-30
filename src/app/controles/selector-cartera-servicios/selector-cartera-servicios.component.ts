import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CarteraServiciosService } from 'src/app/servicios/cartera-servicios.service';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-selector-cartera-servicios',
  templateUrl: './selector-cartera-servicios.component.html',
  styleUrls: ['./selector-cartera-servicios.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorCarteraServiciosComponent),
      multi: true
    }
  ]
})
export class SelectorCarteraServiciosComponent implements OnInit, ControlValueAccessor {

  constructor(private cartera_servicios: CarteraServiciosService) { }
  onChang: any = () => { };
  onTouched: any
  disabled: boolean = false
  writeValue(COD_CARTERA: string): void {
    let servicioelegido = this.listado_servicios.find((servicios) => {
      servicios.value = COD_CARTERA
    })
    if (servicioelegido) {
      this.cod_selecionado = servicioelegido.value
    }
  }
  registerOnChange(fn: any): void {
    this.onChang = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
  async cargarServiciosIpress(COD_IPRESS: string) {
    let respuesta: any[] = await this.cartera_servicios.cargarServiciosIpress(COD_IPRESS).toPromise()

    this.listado_servicios = respuesta.map((Cartera) => {
      Cartera.value = Cartera.COD_CARTERA;
      Cartera.label = Cartera.cartera.NOMBRE_CARTERA.toUpperCase();
      return Cartera
    })
    console.log(this.listado_servicios)

  }
  listado_servicios: SelectItem[] = []
  cod_selecionado: string
  ngOnInit() {
    this.cod_selecionado = "000004210"
    this.cargarServiciosIpress(this.cod_selecionado)
  }

}
