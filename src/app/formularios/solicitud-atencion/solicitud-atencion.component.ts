import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { SelectorIpressMinComponent } from 'src/app/controles/selector-ipress-min/selector-ipress-min.component';
import { PersonaComponent } from '../persona/persona.component';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-atencion',
  templateUrl: './solicitud-atencion.component.html',
  styleUrls: ['./solicitud-atencion.component.css']
})
export class SolicitudAtencionComponent implements OnInit {
  @Output() cambiodistrito = new EventEmitter()
  @ViewChild('selectoripres', { static: false }) selectoripres: SelectorIpressMinComponent
  @ViewChild('formpersona', { static: false }) formpersona: PersonaComponent
  visible:boolean=true
  constructor(private solicituss: SolicitudesService, private formbuilder: FormBuilder,public router:Router) { }
  SOLICITUDFORM:FormGroup
  ngOnInit() {
    this.SOLICITUDFORM = this.formbuilder.group({
      DESCRIPCION: '',
      ID_IPRESS: ''

    })
  }
  GUARDAR(e) {
    console.log(this.SOLICITUDFORM.value)
    let datossol=this.formpersona.formpersona.value;
    datossol.ID_IPRESS=this.SOLICITUDFORM.value.ID_IPRESS
    datossol.DESCRIPCION=this.SOLICITUDFORM.value.DESCRIPCION
    this.solicituss.nuevaSolicitud(this.formpersona.formpersona.value).subscribe((respuesta) => { console.log(respuesta) })
  }
  cambiar_distrito(e) {

    this.selectoripres.cargarIpressDistrito(e)

  }
  rutanula(){
 
    this.router.navigate([{ outlets: { emergente: null } }]);
  }

}
