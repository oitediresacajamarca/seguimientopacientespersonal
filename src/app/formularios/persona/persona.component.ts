import { Component, OnInit, Input, ViewChild, Output, EventEmitter, forwardRef, ɵConsole } from '@angular/core';
import { SelectItem } from 'primeng';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectorGeograficoVerticalComponent } from 'src/app/controles/selector-geografico-vertical/selector-geografico-vertical.component';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonaComponent),
      multi: true
    }
  ]
})
export class PersonaComponent implements OnInit, ControlValueAccessor {
  ID_DISTRITO

  constructor(private formBuilder: FormBuilder) { }
  writeValue(value: any): void {
    this.ID_DISTRITO = value
  }
  onChange:()=>{}
  onTouched:()=>{}
  disabled
  registerOnChange(fn: any): void {
   this.onChange=fn
  }
  registerOnTouched(fn: any): void {
   this.onTouched=fn
  }
  setDisabledState?(isDisabled: boolean): void {
  this.disabled=isDisabled
  }
  formpersona: FormGroup;
  TIPO_DOC: SelectItem[]
  GENERO: SelectItem[]
  @Output() cambioDistrito = new EventEmitter<any>()
  @ViewChild('selectorgeografico', { static: false }) selectorgeografico: SelectorGeograficoVerticalComponent
  ngOnInit() {
    this.TIPO_DOC = [
      { label: 'DNI', value: null },
      { label: 'CARNET', value: { id: 1, name: 'New York', code: 'NY' } },


    ];
    this.GENERO = [
      { label: 'MASCULINO', value: 1 },
      { label: 'FEMENINO', value: 2 },

    ];
    this.formpersona = this.formBuilder.group({
      NOMBRES: '',
      APELLIDO_PAT: '',
      APELLIDO_MAT: '',
      NRO_DOCUMENTO: '',
      FECHA_NAC: '',
      TELEFONO: '',
      CORREO: '',
      ID_TIPOD: '',
      DIRECCION: '',
      ID_DISTRITO: ''

    })

  }

  CargarInformacionPersona(e) {
    this.formpersona.controls['NOMBRES'].setValue(e.NOMBRES);
    this.formpersona.controls['APELLIDO_PAT'].setValue(e.APELLIDO_PAT);
    this.formpersona.controls['APELLIDO_MAT'].setValue(e.APELLIDO_MAT);
    this.formpersona.controls['NRO_DOCUMENTO'].setValue(e.NRO_DOCUMENTO)
    this.formpersona.controls['TELEFONO'].setValue(e.TELEFONO);
    this.formpersona.controls['CORREO'].setValue(e.CORREO)
    this.formpersona.controls['FECHA_NAC'].setValue(new Date(e.FECHA_NAC))
    this.formpersona.controls['ID_TIPOD'].setValue(e.ID_TIPOD)
    this.formpersona.controls['DIRECCION'].setValue(e.DIRECCION)
    this.selectorgeografico.cargarDistrito(e.ID_DISTRITO)
    this.formpersona.controls['ID_DISTRITO'].setValue(e.ID_DISTRITO)

  }

  seleccionoDistrito(e) {
    console.log('cambio distrito dentro de persona')
    this.cambioDistrito.emit(e);
    

    this.formpersona.controls['ID_DISTRITO'].setValue(e)
    console.log(    this.formpersona.controls['ID_DISTRITO'].value)
  }


}
