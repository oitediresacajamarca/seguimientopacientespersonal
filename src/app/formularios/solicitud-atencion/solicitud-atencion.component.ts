import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { SelectorIpressMinComponent } from 'src/app/controles/selector-ipress-min/selector-ipress-min.component';
import { PersonaComponent } from '../persona/persona.component';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SelectorCarteraServiciosComponent } from 'src/app/controles/selector-cartera-servicios/selector-cartera-servicios.component';
import { MessageService, ConfirmationService } from 'primeng';

@Component({
  selector: 'app-solicitud-atencion',
  templateUrl: './solicitud-atencion.component.html',
  styleUrls: ['./solicitud-atencion.component.css']
})
export class SolicitudAtencionComponent implements OnInit {
  @Output() cambiodistrito = new EventEmitter()
  @ViewChild('selectoripres', { static: false }) selectoripres: SelectorIpressMinComponent
  @ViewChild('formpersona', { static: false }) formpersona: PersonaComponent
  @ViewChild('selectorCartera', { static: false }) COD_CARTERA: SelectorCarteraServiciosComponent
  visible: boolean = true
  constructor(private solicituss: SolicitudesService,
    private messageService: MessageService, private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService, public router: Router) { }
  SOLICITUDFORM: FormGroup
  ngOnInit() {
    this.SOLICITUDFORM = this.formbuilder.group({
      DESCRIPCION: ['', [
        Validators.required,
      ]],
      ID_IPRESS: ['', [
        Validators.required,
      ]],
      COD_CARTERA: ['', [
       
      ]]

    })
  }
  GUARDAR(e) {

    this.confirmationService.confirm({
      message: 'Esta seguro de registrar esta Solicitud',
      accept: () => {

        let datossol = this.formpersona.formpersona.value;

        datossol.ID_IPRESS = this.SOLICITUDFORM.value.ID_IPRESS
        datossol.DESCRIPCION = this.SOLICITUDFORM.value.DESCRIPCION
        datossol.COD_CARTERA = this.SOLICITUDFORM.value.COD_CARTERA

        this.solicituss.nuevaSolicitud(datossol).subscribe((respuesta) => {
          console.log(respuesta)

          if (respuesta.solicitud == "tiene solicitud pendiente") {
            this.messageService.add({ severity: 'error', summary: 'Solicitud No Registrada', detail: 'El paciente ya tiene una solicitud pendiente' });
          }
          if (respuesta.cod_respuesta == 1) {
            this.messageService.add({ severity: 'success', summary: 'Solicitud  Registrada', detail: 'Se registro correctamente la solicitud' });
           this.SOLICITUDFORM.reset()
           this.formpersona.formpersona.reset()
          }

        })


      }
    });
  }
  cambiar_distrito(e) {

    this.selectoripres.cargarIpressDistrito(e)

  }
  rutanula() {

    this.router.navigate([{ outlets: { emergente: null } }]);
  }

  ipressSelec(e) {

    this.COD_CARTERA.cargarServiciosIpress(e)
  }

}
