import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { DistritosService } from '../servicios/distritos.service';
import { FitrarService } from '../servicios/fitrar.service';
import { MorbilidadesService } from '../servicios/morbilidades.service';

@Component({
  selector: 'app-paneldeseguimiento',
  templateUrl: './paneldeseguimiento.component.html',
  styleUrls: ['./paneldeseguimiento.component.css']
})
export class PaneldeseguimientoComponent implements OnInit {

  provincias:SelectItem[];
  provinciaselected:string;
  dddistritos:SelectItem[];
  rangoanos:number[]=[1,120];
  colsresultados:any[];


  distritoselecionado:string;
  generoselecionado:string;
  resultados:any[];
  morbilidades:SelectItem[];
  morbiselected:SelectItem;
  morbilidadesselec:string[];

  constructor(private sd:DistritosService,private fil:FitrarService,private mor:MorbilidadesService) { }

  ngOnInit() {
    this.provincias=[
      {label:"CAJAMARCA",value:"0601"},
      {label:"CAJABAMBA",value:"0602"},
      {label:"CELENDIN",value:"0603"},
      {label:"CHOTA",value:"0604"},
      {label:"CONTUMAZA",value:"0605"},
      {label:"CUTERVO",value:"0606"},
      {label:"HUALGAYOC",value:"0607"},
      {label:"JAEN",value:"0608"},
      {label:"SAN IGNACIO",value:"0609"},
      {label:"SAN MARCOS",value:"0610"},
      {label:"SAN MIGUEL",value:"0611"},
      {label:"SAN PABLO",value:"0612"},
      {label:"SANTA CRUZ",value:"0613"},


    ];

    this.colsresultados=[
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


    this.morbilidades = [
     
  ];
    this.devolverMorbilidades();

  }

  devolverDistritos(){

    this.sd.devolverDistritos(this.provinciaselected).subscribe((datos)=>{this.dddistritos=datos.respuesta});
  }

  devolverMorbilidades(){
    this.mor.devolverMorbilidades().subscribe(
      (datos)=>{
        
      this.morbilidades.push(datos.respuesta)
    
      
      
      });

  }




  BUSCAR(){
    this.resultados=[];

    this.fil.devolverEncabezadoReporte().subscribe((dat)=>{

        this.colsresultados=dat.respuesta;

    });


   
    this.fil.filtra(this.distritoselecionado,this.rangoanos[0].toString(),this.rangoanos[1].toString(),this.generoselecionado).subscribe(
      (datos)=>{


        this.resultados.push(datos.respuesta);

        
        
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

}
