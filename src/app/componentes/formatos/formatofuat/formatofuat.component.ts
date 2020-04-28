import { Component, OnInit } from '@angular/core';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-formatofuat',
  templateUrl: './formatofuat.component.html',
  styleUrls: ['./formatofuat.component.css']
})
export class FormatofuatComponent implements OnInit {
  list1=[];
  list2=[];
  visibleSidebar4:boolean=true;
  tipodiag:SelectItem[];
  selectedtipdiag:SelectItem;
  dianosticospac:any[]=[];
  cod_diag_selec:string="";
  desc_diag_selec:string="";
  nombresyapellidosper:string;
  datossession:any;
  tipcontrol:string;
  tratamientoactual:string;
  especialidades:string;
  examenesdeapoyo:string;
  motivos:string[];
  fechayhora:Date=new Date();
  recomendaciones:string[];

  constructor(private morbilidad:MorbilidadesService) { }

  ngOnInit() {
    this.list1=[{brand:"3",year:"2019",color:"azul"},{brand:"3",year:"2019",color:"azul"}]
   this.list2 =[{brand:"3",year:"2019",color:"azul"}];

   this.tipodiag=[{label:'Presuntivo',value:'P'},{label:'Definitivo',value:'D'},{label:'Repetitivo',value:'R'}] ;  
  this.datossession=localStorage.getItem('datos');
   this.nombresyapellidosper=JSON.parse(this.datossession ).APELLIDO_PAT+' '+JSON.parse(this.datossession ).APELLIDO_MAT+' '+JSON.parse(this.datossession ).NOMBRES


  }


  devolverListaCie(){

    this.morbilidad.devolverMorbilidades().subscribe(
          (datos)=>{
            this.list1=datos.respuesta;
            
          }


          )
      }

  aniadediag(e){

    this.list1=[{brand:"3",year:"2019",color:"azul"},{brand:"3",year:"2019",color:"azul"}]
      this.dianosticospac.push({item:this.dianosticospac.length+1,cod_cie:this.cod_diag_selec,tip_diag:this.selectedtipdiag})
  
  }

}
