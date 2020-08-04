import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { Persona } from 'src/app/interfaces/persona';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-buscador-dni',
  templateUrl: './buscador-dni.component.html',
  styleUrls: ['./buscador-dni.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuscadorDniComponent),
      multi: true
    }
  ]
})
export class BuscadorDniComponent implements OnInit, ControlValueAccessor {

  constructor(private personas: PersonaService) { }

  writeValue(obj: any): void {
    this.NRO_DOC_BUSCAR = obj
    this.cambioDocumento( this.NRO_DOC_BUSCAR )
  }
  cambioDocumento: any = (dato) => {

  };
  registerOnChange(fn: any): void {
    this.cambioDocumento = fn
  }
  registerOnTouched(fn: any): void {
  
  }
  setDisabledState?(isDisabled: boolean): void {

  }
  NRO_DOC_BUSCAR: string;
  @Output() perosnaencontrada: EventEmitter<Persona> = new EventEmitter()
  persona: Persona
  ngOnInit() {
  }
  BuscarNro_documento(e) {

    this.personas.devolverPersonaPorDocumento(this.NRO_DOC_BUSCAR, '1').subscribe((respuesta) => {

      this.perosnaencontrada.emit(respuesta);
    },
      (error) => {

        this.perosnaencontrada.emit(error);
      }
    )

  }

}
