import { Component, OnInit, forwardRef } from '@angular/core';
import { SelectItem } from 'primeng';
import { DistritosService } from 'src/app/servicios/distritos.service';
import { IpressService } from 'src/app/servicios/ipress.service';
import { DistribucionAdministrativaService } from 'src/app/servicios/distribucion-administrativa.service';
import { DistribucionGeograficaService } from 'src/app/servicios/distribucion-geografica.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-selector-ipress-min',
  templateUrl: './selector-ipress-min.component.html',
  styleUrls: ['./selector-ipress-min.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorIpressMinComponent),
      multi: true
    }
  ]
})
export class SelectorIpressMinComponent implements OnInit, ControlValueAccessor {
  ipressfiltradas: SelectItem[]
  constructor(private dist: DistribucionGeograficaService) { }
  ID_PRESS
  onChange: (valor) => void
  untochedIpress: () => void
  writeValue(valor: any): void {
    this.ID_PRESS = valor
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.untochedIpress = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {

  }
  cambioIpress(valor) {
   
    this.onChange(valor.value)

  }
  cargarIpressDistrito(ID_DISTRITO: string) {

    this.dist.devolverIpressPorIdDistrito(ID_DISTRITO).subscribe(async (ipresses) => {

      this.ipressfiltradas = ipresses.map((ipress) => {
        ipress.label = ipress.NOMBRE;
        ipress.value = ipress.COD_IPRESS;
        return ipress;
      })


    })
  }

}
