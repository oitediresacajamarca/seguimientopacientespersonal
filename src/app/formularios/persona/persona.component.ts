import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  constructor() { }
  TIPO_DOC: SelectItem[]
  GENERO: SelectItem[]
  ngOnInit() {
    this.TIPO_DOC = [
      { label: 'DNI', value: null },
      { label: 'CARNET', value: { id: 1, name: 'New York', code: 'NY' } },
     

    ];
    this.GENERO = [
      { label: 'MASCULINO', value: null },
      { label: 'FEMENINO', value: { id: 1, name: 'New York', code: 'NY' } },

    ];
  }

}
