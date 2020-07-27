import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { Persona } from 'src/app/interfaces/persona';


@Component({
  selector: 'app-buscador-dni',
  templateUrl: './buscador-dni.component.html',
  styleUrls: ['./buscador-dni.component.css']
})
export class BuscadorDniComponent implements OnInit {

  constructor(private personas: PersonaService) { }
  NRO_DOC_BUSCAR: string;
  @Output() perosnaencontrada: EventEmitter<Persona> = new EventEmitter()
  persona:Persona
  ngOnInit() {
  }
  BuscarNro_documento(e) {
    console.log(this.NRO_DOC_BUSCAR)
    this.personas.devolverPersonaPorDocumento(this.NRO_DOC_BUSCAR, '1').subscribe((respuesta) => {
    
      this.perosnaencontrada.emit(respuesta);
    },
    (error) => { 
   
      this.perosnaencontrada.emit(error);
    }
    )

  }

}
