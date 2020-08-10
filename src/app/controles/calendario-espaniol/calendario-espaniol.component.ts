import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-calendario-espaniol',
  templateUrl: './calendario-espaniol.component.html',
  styleUrls: ['./calendario-espaniol.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarioEspaniolComponent),
      multi: true
    }
  ]
})

export class CalendarioEspaniolComponent implements OnInit , ControlValueAccessor {
  fecha: Date
  es: any
  onChange:any=(dato)=>{}
  constructor() { }
  writeValue(obj: any): void {
    this.fecha=obj
  }
  cambiaFecha(){
    this.onChange(this.fecha)
  }
  registerOnChange(fn: any): void {
   this.onChange=fn
  }
  registerOnTouched(fn: any): void {
   
  }
  setDisabledState?(isDisabled: boolean): void {
   
  }

  ngOnInit() {
    this.fecha = new Date()
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

}
