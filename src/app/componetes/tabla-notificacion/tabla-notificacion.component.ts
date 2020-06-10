import { Component, OnInit, ɵConsole, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';
import { EstadosService } from 'src/app/servicios/estados.service';
import { ContextMenu } from 'primeng/contextmenu/contextmenu';
import { EditarSolComponent } from '../editar-sol/editar-sol.component';
import { MessageService } from 'primeng/api';
import { async } from 'rxjs/internal/scheduler/async';




@Component({
  selector: 'app-tabla-notificacion',
  templateUrl: './tabla-notificacion.component.html',
  styleUrls: ['./tabla-notificacion.component.css'],


})
export class TablaNotificacionComponent implements OnInit {
  pacientes: any[];
  pacientesSelected: any[];
  cols: any[] = []
  @Output() displayNotificacion: EventEmitter<any> = new EventEmitter();
  cod_ambito: string;
  selectedNoti: any;
  selectCars: any[];
  elementosmenu: MenuItem[];
  verDialog:boolean=true;
  cm: ContextMenu
  @ViewChild('editar', { static: false }) editar: EditarSolComponent



  constructor(private sol: SolicitudesService, private morb: MorbilidadesService, private router: Router,
    private estados: EstadosService,private messageService: MessageService,private elementRef: ElementRef) { }

  ngOnInit() {
    this.estados.actualizarNotificacione.subscribe(()=>{

      this.cargarNotificaciones();
      this.verDialog=true;

    })
    this.elementosmenu = [
      {
        label: 'Registrar Atencion', icon: 'pi pi-calendar-plus', command: (event) => {

          this.router.navigate(['/admin/atencion/' + this.selectedNoti.NRO_DOCUMENTO + '/' + this.selectedNoti.ID_PACIENTE + '/' + this.selectedNoti.ID_SOLICITUD]);
          this.verDialog=false;
        }
      },

      {
        label: 'Mantener en Seguimiento', icon: 'pi pi-heart', command: (event) => {


        }
      },
      {
        label: 'Editar Solicitud', icon: 'pi pi-user-edit', command: (event) => {
          this.editar.editarsol = true;
          this.editar.selecipres.selecionar_Ipress(this.selectedNoti.COD_IPRESS)
          this.editar.solicitud=this.selectedNoti
          this.editar.cod_solicitud=this.selectedNoti.ID_SOLICITUD
          console.log(this.selectedNoti)

        }
      },
      {
        label: 'Cerrar Soliciitud', icon: 'pi pi-times', command: (event) => {
          console.log(this.selectedNoti)

          this.sol.cerrarSolicitud(this.selectedNoti.ID_SOLICITUD).subscribe(dato => {

            this.cargarNotificaciones();
          })



        }
      },
    ];

    let SESION: any = JSON.parse(localStorage.getItem('datos'));



    this.cod_ambito = this.estados.cod_con;

this.cols=[{header:"ESTADOS",field:"ESTADO"},{header:"FECHA_SOLICITUD",field:"FECHA_SOLICITUD"}]

this.cols=
[
  {
    "header": "FECHA DE SOLICITUD",
    "field": "FECHA_SOLICITUD"
  },
  {
    "header": "TELEFONO",
    "field": "TELEF_CONTACTO"
  },
  {
    "header": "NRO_DOCUMENTO",
    "field": "NRO_DOCUMENTO"
  },
  {
    "header": "APELLIDO_PAT",
    "field": "APELLIDO_PAT"
  },
  {
    "header": "APELLIDO_MAT",
    "field": "APELLIDO_MAT"
  },
  {
    "header": "NOMBRES",
    "field": "NOMBRES"
  },
  {
    "header": "NOMBRE_IPRESS",
    "field": "NOMBRE_IPRESS"
  },
  {
    "header": "NOMBRE_PROVINCIA",
    "field": "NOMBRE_PROVINCIA"
  },
  {
    "header": "NOMBRE_DISTRITO",
    "field": "NOMBRE_DISTRITO"
  },

  {
    "header": "MOTIVO",
    "field": "DESCRIPCION"
  },
  {
    "header": "TELEF_CONTACTO2",
    "field": "TELEF_CONTACTO2"
  },
  {
    "header": "DOMICILIO_ACTUAL",
    "field": "DOMICILIO_ACTUAL"
  },
  {
    "header": "CORREO2",
    "field": "CORREO2"
  },
  
  {
    "header": "FECHA_NAC",
    "field": "FECHA_NAC"
  },
  {
    "header": "ID_GENERO",
    "field": "ID_GENERO"
  },
  

]

   /* this.sol.devolverColumnasSolicitudes().subscribe((res) => {

      this.cols = res.respuesta;


    })*/

    this.cargarNotificaciones()



  }
  actualizoSolicitud(){
    this.messageService.add({key: 'myKey2', severity:'success', summary: 'ACTUALIZACION CORRECTA', detail: 'LA SOLICITUD HA SIDO CAMBIADA EXITOSAMENTE'});
    this.cargarNotificaciones();
    this.editar.editarsol=false;
  }

  async cargarNotificaciones() {


    let maximo_cie = 0;
  await  this.sol.devolverDatosSolicitudes(this.cod_ambito).subscribe((datos) => {
      let solicitudes = datos.recordset;


      var max_col_sol = 0;
/*
      solicitudes.forEach(solicitud => {

        let solicitudedit = solicitud;
        
        this.morb.devolverMorbildadPaciente(solicitud.ID_PACIENTE).subscribe((dato) => {
          max_col_sol = 0;
          let morbilidades = dato.respuesta;
          morbilidades.forEach((morvilidad) => {

            max_col_sol = max_col_sol + 1;
            solicitudedit['ID_MEDICAMENTO_' + max_col_sol] = morvilidad.ID_MEDICAMENTO;
            solicitudedit['ID_CIE_' + max_col_sol] = morvilidad.ID_CIE;

            if (max_col_sol > maximo_cie) {

              maximo_cie = max_col_sol;
              let col = { 'header': 'ID_MEDICAMENTO_' + maximo_cie, 'field': 'ID_MEDICAMENTO_' + maximo_cie };
              this.cols.push(col);
              col = { 'header': 'ID_CIE_' + maximo_cie, 'field': 'ID_CIE_' + maximo_cie };
              this.cols.push(col);


            }







          });



        });




      });

*/



      this.pacientes = solicitudes;


    });
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.pacientes);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
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
  vi(e) {
    console.log(e)

console.log(    this.elementRef.nativeElement);
  
  }

}
