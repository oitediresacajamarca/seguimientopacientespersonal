import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { DistritosService } from '../servicios/distritos.service';
import { FitrarService } from '../servicios/fitrar.service';

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

  constructor(private sd:DistritosService,private fil:FitrarService) { }

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
  }

  devolverDistritos(){

    this.sd.devolverDistritos(this.provinciaselected).subscribe((datos)=>{this.dddistritos=datos.respuesta});
  }

  gjj(){}

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

}
