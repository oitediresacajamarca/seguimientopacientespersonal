      import { Component, OnInit, ViewChild } from '@angular/core';
      import { SelectItem } from 'primeng/api/selectitem';
      import { DistritosService } from '../servicios/distritos.service';
      import { FitrarService } from '../servicios/fitrar.service';
      import { MorbilidadesService } from '../servicios/morbilidades.service';
      import { MenuItem } from 'primeng/api/menuitem';
      import { TablaMorbilidadesComponent } from '../componentes/tabla-morbilidades/tabla-morbilidades.component';
import { MaestrosService } from '../servicios/maestros.service';
import { Button } from 'primeng/button/button';
import { EstadosService } from '../servicios/estados.service';
import { Router } from '@angular/router';

      @Component({
        selector: 'app-paneldeseguimiento',
        templateUrl: './paneldeseguimiento.component.html',
        styleUrls: ['./paneldeseguimiento.component.css']
      })
      export class PaneldeseguimientoComponent implements OnInit {

        provincias: SelectItem[];
        provinciaselected: string;
        dddistritos: SelectItem[];
        rangoanos: number[] = [0, 120];
        colsresultados: any[];
        padones_selected: string = '';
        morbilidadesSeleccionadas:string[]=[];

        sideBarOpen: boolean = false;
        items: MenuItem[];
        rowIndex;
        selectedResultado;


        distritoselecionado: string;
        generoselecionado: string = '';
        resultados: any[];
  
    
        cod_ambito: string = '06';
        ambito: string = "R";

        padrones: SelectItem[]=[];
        @ViewChild('tablamorb', { static: false }) tablamorb: TablaMorbilidadesComponent
        @ViewChild('btbuscar', { static: false }) btbuscar:Button

        constructor(private sd: DistritosService, private fil: FitrarService, 
          private mor: MorbilidadesService,private maestros:MaestrosService,
           private estados:EstadosService, private router: Router) { }

        ngOnInit() {
          this.devolverPadrones();
        if (this.estados.actualizarPerfil){
          console.log('se aactuyalizara')
          this.router.navigate([{ outlets: { emergente: 'actualizar' }}]);

        }

          this.provincias = [
            { label: "CAJAMARCA", value: "0601" },
            { label: "CAJABAMBA", value: "0602" },
            { label: "CELENDIN", value: "0603" },
            { label: "CHOTA", value: "0604" },
            { label: "CONTUMAZA", value: "0605" },
            { label: "CUTERVO", value: "0606" },
            { label: "HUALGAYOC", value: "0607" },
            { label: "JAEN", value: "0608" },
            { label: "SAN IGNACIO", value: "0609" },
            { label: "SAN MARCOS", value: "0610" },
            { label: "SAN MIGUEL", value: "0611" },
            { label: "SAN PABLO", value: "0612" },
            { label: "SANTA CRUZ", value: "0613" },
          ];

          this.colsresultados = [
            { field: 'nrodoc', header: 'Numero Documento' },
            { field: 'ap_paterno', header: 'Apellido Paterno' },
            { field: 'ap_materno', header: 'Apellido Materno' },
            { field: 'nombres', header: 'Nombres' },
            { field: 'provincia', header: 'provincia' },
            { field: 'distrito', header: 'distrito' },
            { field: 'edad', header: 'edad' },
            { field: 'telefono', header: 'telefono' },
            { field: 'correo', header: 'Correo Electronico' },
          ]

          this.items = [
            {
              label: 'File',
              items: [{
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                  { label: 'Project' },
                  { label: 'Other' },
                ]
              },
              { label: 'Open' },
              { label: 'Quit' }
              ]
            },
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
              ]
            }
          ];


      
      

        }

        devolverPadrones(){
            this.maestros.devolverPadrones().subscribe((datos)=>{
              
             
                datos.respuesta.forEach((padron)=>{
                  let padrontemp:any={}


                  padrontemp.label=padron.NOMBRE_PADRON;
                  padrontemp.value=padron.ID_PADRON;
                  this.padrones.push(padrontemp);

                })

                console.log(this.padrones)

              

            })

        }

        devolverDistritos(e) {
          this.ambito = 'P';
          this.cod_ambito = e.value;
          this.sd.devolverDistritos(this.provinciaselected).subscribe((datos) => { this.dddistritos = datos.respuesta });
        }

        seleccionoDistrito(e) {
          this.ambito = 'D';
          this.cod_ambito = e.value;

        }
        seleccionPadron(e) {

          this.padones_selected = e.value

        }



      




        BUSCAR() {

          this.btbuscar.disabled=true;

          this.resultados = [];
         

          this.fil.devolverEncabezadoReporte().subscribe((dat) => {

            this.colsresultados = dat.respuesta;

          });



          this.fil.filtra(this.ambito, this.cod_ambito, this.rangoanos[0].toString()
            , this.rangoanos[1].toString(), this.generoselecionado, this.padones_selected, this.morbilidadesSeleccionadas).subscribe(
              (datos) => {

                this.resultados = datos.respuesta;
                this.btbuscar.disabled=false;


              },
              (error) => {
                this.btbuscar.disabled=false;

              }
            )

        }

        exportExcel() {
          import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.resultados);
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


        sideBarToggler() {
          this.sideBarOpen = !this.sideBarOpen;
        }
        cambioSelecionMorb(e) {
         this.morbilidadesSeleccionadas=e;
        
        }

      }
