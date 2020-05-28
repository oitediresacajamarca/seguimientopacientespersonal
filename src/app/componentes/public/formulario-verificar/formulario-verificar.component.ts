import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { MessageService } from 'primeng/api';
import { EstadosService } from 'src/app/servicios/estados.service';


@Component({
  selector: 'app-formulario-verificar',
  templateUrl: './formulario-verificar.component.html',
  styleUrls: ['./formulario-verificar.component.css']
})
export class FormularioVerificarComponent implements OnInit {

  constructor(private pers: PersonaService, private mesgs: MessageService, private est: EstadosService) { }

  msgvalidaper: any[];
  tiposdoc: SelectItem[];
  numerodoc: string;
  tipodocseleccionado: string;
  FECNAC: Date;
  es: any;
  msgs: any[];
  verpaneldatosgenerales: boolean = false;
  verpanelregistro: boolean = false;
  @Output('verificoform') verificoform = new EventEmitter<any>()


  ngOnInit() {


    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "MI", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.tiposdoc = [
      { label: 'DNI', value: '1' },
      { label: 'CARNET', value: '2' },
      { label: 'PASS', value: '3' }
    ]
  }


  solicitaAtencion() {
    if (this.numerodoc == '') { alert('debera de ingresar un numero de documento valido') }
    if (this.FECNAC == null) { alert('debera de ingresar su fecha de nacimiento ') }

    if (this.numerodoc != '' && this.FECNAC != null) {


      this.pers.devolverPersona(this.tipodocseleccionado, this.numerodoc, this.FECNAC.getFullYear() + '-' + (this.FECNAC.getMonth() + 1) + '-' + this.FECNAC.getDate()).subscribe((dat) => {


        this.msgvalidaper = []
        this.mesgs.clear();

        if (dat.respuesta.existeper != "" && dat.respuesta.coincidefecha == "") {

          this.msgvalidaper.push({ severity: 'info', summary: 'Datos no validos', detail: '', key: 'validapersona' });
        } else {



          if (dat.respuesta.tienesolicitudpendiente != "") {
            this.msgvalidaper.push({ severity: 'info', summary: ' Usted ya tiene una solicitud pendiente', detail: '', key: 'validapersona' });
            this.verpanelregistro = false;
          }

          if (dat.respuesta.existeper == "") {

            this.verpanelregistro = true;
            this.verpaneldatosgenerales = true;

          }


          if (dat.respuesta.existeper != "" && dat.respuesta.tienesolicitudpendiente == "") {

            this.verpanelregistro = true;
            this.verpaneldatosgenerales = false;
            this.mesgs.add({ severity: 'success', summary: 'PACIENTE IDENTIFICADO:', detail: 'Para solicitar atencion complete el siguiente formulario: ' });

          }


        }
        this.est.verificoform.emit({
          verpanelregistro: this.verpanelregistro,
          verpaneldatosgenerales: this.verpaneldatosgenerales, tipodocseleccionado: this.tipodocseleccionado
          , FECNAC: this.FECNAC, numerodoc: this.numerodoc
        });

      });


    }



  }


}
