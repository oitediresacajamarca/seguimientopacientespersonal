import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-busqueda-nominal',
  templateUrl: './busqueda-nominal.component.html',
  styleUrls: ['./busqueda-nominal.component.css']
})
export class BusquedaNominalComponent implements OnInit {

  constructor(private router: Router, private formbuilder: FormBuilder, private personas: PersonaService, private estados: EstadosService) { }
  verpanel = true;
  formbus
  resultados = [];
  ngOnInit() {
    this.verpanel = true;
    this.formbus = this.formbuilder.group({
      NOMBRES: '',
      APELLIDO_PAT: '',
      APELLIDO_MAT: ''

    })
  }
  ocultar() {
    this.router.navigate([{ outlets: { emergente: null } }])
  }
  buscar_persona() {
    console.log(this.formbus.value)
    this.personas.buscarPersona(this.formbus.value).subscribe(datos => {

      this.resultados = datos;
    })
  }
  seleccionaDni(NRO_DOCUMENTO) {
    this.estados.pacienteporatender.emit(NRO_DOCUMENTO);
  }


}
