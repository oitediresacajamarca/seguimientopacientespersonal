import { Component, OnInit, Output, forwardRef, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-selector-financiador',
  templateUrl: './selector-financiador.component.html',
  styleUrls: ['./selector-financiador.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorFinanciadorComponent),
      multi: true
    }
  ]
})
export class SelectorFinanciadorComponent implements OnInit, ControlValueAccessor {
  financiadorSeleccionado: number=2
  @Output()
  eligioFinanciador = new EventEmitter<any>()
  cambioFinanciador(dato){
    let objeto = this.devolverNombreFinanciador()
    this.eligioFinanciador.emit({ COD_FINANCIADOR: dato, VALOR: objeto.label })
    this.onChang({ COD_FINANCIADOR: dato, VALOR: objeto.label })

  }
  onChang: any = (dato) => {
   
  };
  devolverNombreFinanciador() {
    let finaciadorObjeto = this.financiadores.find((financiador) => { return financiador.value == this.financiadorSeleccionado })
    return finaciadorObjeto;
  }
  onTouched: () => void;
  disabled: boolean = false
  constructor() { }
  writeValue(obj: any): void {
   
    this.financiadorSeleccionado = obj
    let objeto = this.devolverNombreFinanciador()
  
    if(objeto!=undefined){
    this.eligioFinanciador.emit({ COD_FINANCIADOR: this.financiadorSeleccionado, VALOR: objeto.label })
 
    this.onChang({ COD_FINANCIADOR: this.financiadorSeleccionado, VALOR: objeto.label })
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
  financiadores: SelectItem[]
  ngOnInit() {
    this.financiadores = [
      {
        value: 1,
        label: "USUARIO"
      },
      {
        value: 2,
        label: "S.I.S"
      },
      {
        value: 3,
        label: "ESSALUD"
      },
      {
        value: 4,
        label: "S.O.A.T"
      },
      {
        value: 5,
        label: "SANIDAD F.A.P"
      },
      {
        value: 6,
        label: "SANIDAD NAVAL"
      },
      {
        value: 7,
        label: "SANIDAD EP"
      },
      {
        value: 8,
        label: "SANIDAD PNP"
      },
      {
        value: 9,
        label: "PRIVADOS"
      },
      {
        value: 10,
        label: "OTROS"
      },
      {
        value: 11,
        label: "EXONERADO"
      }
    ]
  }

}
