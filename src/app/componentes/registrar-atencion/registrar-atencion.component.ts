import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { DatosAtencionComponent } from './datos-atencion/datos-atencion.component';
import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { Atencion } from 'src/app/interfaces/atencion';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  fechaatencion: Date = new Date()
  @Input() cod_paciente: string
  @Input() visible: boolean;
  @Input() ID_PACIENTE: string;
  @Input() ID_SOLICITUD: string;
  @ViewChild('form1', { static: false }) form1: DatosAtencionComponent;
  @ViewChild('form2', { static: false }) form2: DiagnosticosComponent;
  @ViewChild('form3', { static: false }) form3: TratamientoComponent;
  motivoAte: string;
  casocovit: boolean;
  tipocov: string;
  trabajador_id: string;
  sesion: any;
  pasos: MenuItem[];
  activo: MenuItem;
  @Input() atencion: Atencion
  @Input() datosPaciente: any

  constructor(private aten: AtencionService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.sesion = JSON.parse(localStorage.getItem('datos'));
    this.pasos = [{ label: "DATOS DE LA ATENCION" }, { label: "DIAGNOSTICOS" }, { label: "TRATAMIENTO Y RECOMENDACIONES" }]


    this.trabajador_id = this.sesion.TRABAJADOR_ID;
  }



  registrarAtencion(event) {

    console.log(this.form1.examenesFisicos);
    console.log(this.form1.atencion_detalle);
    console.log(this.form2.diagnostabla)
    let id_atencion;

    this.confirmationService.confirm({
      message: 'Esta seguro de que deseas Guardar la Atencion',
      accept: () => {

        this.form1.atencion_detalle.N_CONTROL= this.form1.numcon;
      
      //  this.form1.atencion_detalle.MOTIVO=this.form1..toString();
        this.aten.registrar(
          this.atencion

        ).subscribe((RESPUESTA) => {
          id_atencion = RESPUESTA.respuesta.identiti;
          this.form1.examenesFisicos
          this.aten.registrarExamenfis(this.form1.examenesFisicos.examenes, id_atencion, this.trabajador_id).subscribe(() => { });           
          this.aten.registrarAtencionDetalle(this.form1.atencion_detalle,id_atencion,this.trabajador_id).subscribe(()=>{});
          this.aten.registrarAtencionDiagnosticos(this.form2.diagnostabla,id_atencion,this.trabajador_id).subscribe(()=>{});
         
          this.confirmationService.confirm({message: 'Se guardaron los datos correctamente'})
         
         
          this.visible=false;
        });
      }
    })


  }

  selecionarForm() {
    if (this.activo == 0) {
      this.form1.visible = true

    } else {
      this.form1.visible = false;
    }

    if (this.activo == 1) {
      this.form2.visible = true

    } else {
      this.form2.visible = false;
    }
    if (this.activo == 2) {
      this.form3.visible = true

    } else {
      this.form3.visible = false;
    }





  }


}
