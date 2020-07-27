import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { EstadosService } from 'src/app/servicios/estados.service';
import { FormBuilder } from '@angular/forms';
import { SelectorIpressHorizontalComponent } from 'src/app/controles/selector-ipress-horizontal/selector-ipress-horizontal.component';

@Component({
  selector: 'app-atenciones-realizadas',
  templateUrl: './atenciones-realizadas.component.html',
  styleUrls: ['./atenciones-realizadas.component.css']
})
export class AtencionesRealizadasComponent implements OnInit {
  @Input() id_personal: string = '';
  datos_tabla_atenciones: any[] = []
  elementosmenu: any[]
  desde: Date;
  hasta: Date
  formulario
  ipressselecionada
  @ViewChild('ambitoselec', { static: false })
  ambitoselec: SelectorIpressHorizontalComponent

  constructor(private ate: AtencionService, private estados_service: EstadosService, private fb: FormBuilder) {


  }
  seleccionoaipres(ipress) {
    this.ipressselecionada = ipress

  }

  ngOnInit() {

    this.estados_service.actualizarNotificacione.subscribe(() => {


    })

    this.elementosmenu = [
      {
        label: 'Atencion',
        items: [{
          label: 'Diagnosticos Realizados',
          icon: 'pi pi-fw pi-plus',

        },
        { label: 'Examenes Fisicos' },
        { label: 'Tratamiento' }
        ]
      },
      {
        label: 'FUAT',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Mostrar Fuat', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];

    this.formulario = this.fb.group({ DESDE: this.desde, HASTA: this.hasta })
  }
  buscarPorFechas() {


    let d = this.desde.getFullYear() + '/' + (this.desde.getMonth().valueOf() + 1) + '/' + this.desde.getDate();
    let h = this.hasta.getFullYear() + '/' + (this.hasta.getMonth().valueOf() + 1) + '/' + this.hasta.getDate();
    this.ate.devolverAtencionesRealizadasPorfechaIpress(d, h, this.ipressselecionada).subscribe((datos) => {
      console.log(datos)
      this.datos_tabla_atenciones = datos;
    });


  }
  buscarPorFechasAmbito() {


    let d = this.desde.getFullYear() + '/' + (this.desde.getMonth().valueOf() + 1) + '/' + this.desde.getDate();
    let h = this.hasta.getFullYear() + '/' + (this.hasta.getMonth().valueOf() + 1) + '/' + this.hasta.getDate();
    let ambito = this.ambitoselec.ambito
    ambito.DESDE = d
    ambito.HASTA = h

    this.ate.devolverAtencionesRealizadasPorfechaAmbito(ambito).subscribe((datos) => {
      console.log(datos)
      this.datos_tabla_atenciones = datos;
    });


  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.datos_tabla_atenciones.map(
        atencion => {
          return {
            NRO_DOC: atencion.personaatendida.NRO_DOCUMENTO,
            APELLIDO_PAT: atencion.personaatendida.APELLIDO_PAT,
            APELLIDO_MAT: atencion.personaatendida.APELLIDO_MAT,
            NOMBRES: atencion.personaatendida.NOMBRES,
            TELEFONO: atencion.personaatendida.TELEFONO,
            ANTECEDENTE: atencion.ANTECEDENTE,
            NOMBRE_PERSONAL: atencion.trabajadorpersona.NOMBRES,
            NOMBRE_APELLIDO_PAT: atencion.trabajadorpersona.APELLIDO_PAT,
            NOMBRE_APELLIDO_MAT: atencion.trabajadorpersona.APELLIDO_MAT,
            FECHA: atencion.FECHA,

          }
        }


      ));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "AtencionesRealizadas");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


  devolvertenciones() {
    this.id_personal = JSON.parse(localStorage.getItem('datos')).id_persona
    this.ate.devolverAtencionesRealizadas(this.id_personal).subscribe(datos => {
      this.datos_tabla_atenciones = datos.recordset;
    });
  }



}
