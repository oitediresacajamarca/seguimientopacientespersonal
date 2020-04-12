import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { MorbilidadesTablaItem } from 'src/app/interfaces/morbilidades-tabla-item';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { element } from 'protractor';

@Component({
  selector: 'app-tabla-morbilidades',
  templateUrl: './tabla-morbilidades.component.html',
  styleUrls: ['./tabla-morbilidades.component.css']
})
export class TablaMorbilidadesComponent implements OnInit {

  customers: MorbilidadesTablaItem[];

  selectedCustomers: MorbilidadesTablaItem[];
  morbilidadesselec:string[];

 

  statuses: any[];

  loading: boolean = true;

  @ViewChild('dt',{static:false}) table: Table;


  constructor(private morb:MorbilidadesService) { }

  ngOnInit() {
  this.customers=[];
  this.morb.devolverMorbilidades().subscribe((dat)=>{
  this.customers=dat.respuesta;

  this.loading = false;
 

  console.log(dat);
})
  }



  aniadirMorb()
{

          let a:string[]=[];
          this.selectedCustomers.forEach(element => {
          let el=  element as any
          a.push(el.label)
     
        
        });

        this.morbilidadesselec=a;
}


removerMorb(event){

this.selectedCustomers
}


}







