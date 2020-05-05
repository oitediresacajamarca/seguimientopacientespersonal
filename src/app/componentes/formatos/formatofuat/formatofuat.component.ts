import { Component, OnInit } from '@angular/core';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { SelectItem } from 'primeng/api/selectitem';
import { MenuItem } from 'primeng/api/menuitem';
import { FormatoFuat } from 'src/app/interfaces/formato-fuat';

@Component({
  selector: 'app-formatofuat',
  templateUrl: './formatofuat.component.html',
  styleUrls: ['./formatofuat.component.css']
})
export class FormatofuatComponent implements OnInit{
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
  lab_selec:string;
  pasos:MenuItem[];
  activo:MenuItem;
  horafechasolicitud:Date;
  formatofuat:FormatoFuat;

  constructor(private morbilidad:MorbilidadesService) { }

  ngOnInit() {
    this.list1=[{brand:"3",year:"2019",color:"azul"},{brand:"3",year:"2019",color:"azul"}]
   this.list2 =[{brand:"3",year:"2019",color:"azul"}];

   this.tipodiag=[{label:'Presuntivo',value:'P'},{label:'Definitivo',value:'D'},{label:'Repetitivo',value:'R'}] ;  
  this.datossession=localStorage.getItem('datos');
   this.nombresyapellidosper=JSON.parse(this.datossession ).APELLIDO_PAT+' '+JSON.parse(this.datossession ).APELLIDO_MAT+' '+JSON.parse(this.datossession ).NOMBRES
   this.formatofuat=JSON.parse(localStorage.getItem('formatofuat'))||{};
   this.pasos=    [
    {label: 'DATOS DE LA ATENCION REALIZADA'},
    {label: 'ATENCIÓN DEL SERVICIO DE TELEORIENTACIÓN O TELEMONITOREO'},
    {label: 'MOTIVO DE LA TELECONSULTA'},
    {label: 'DATOS DE LA IPRESS'},
    {label: 'DIAGNOSTICO Y RECOMENDACIONES'}
];

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
