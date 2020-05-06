import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { MorbilidadesTablaItem } from 'src/app/interfaces/morbilidades-tabla-item';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';


@Component({
  selector: 'app-tabla-morbilidades',
  templateUrl: './tabla-morbilidades.component.html',
  styleUrls: ['./tabla-morbilidades.component.css']
})
export class TablaMorbilidadesComponent implements OnInit {

  customers: MorbilidadesTablaItem[];

  selectedCustomers: MorbilidadesTablaItem[];
  morbilidadesselec:string[];
 public codigosSelect:string[];

 

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
          let cod:string[]=[];
         
          this.selectedCustomers.forEach(element => {
          let el=  element as any
          a.push(el.label)
          cod.push(el.value)
     
        
        });
        this.codigosSelect=cod;
        this.morbilidadesselec=a;
}


        removerMorb(event){


          let seleccionueva:any=[];
          let indiceremover:number;
          indiceremover=this.selectedCustomers.findIndex(element=>element.label==event)
          
        
                    this.selectedCustomers.splice(indiceremover,1)
                    this.codigosSelect.splice(indiceremover,1)
                    seleccionueva= this.selectedCustomers
                    this.selectedCustomers=[];
                    seleccionueva.forEach(element => {
                      this.selectedCustomers.push(element)
          });
          
        
          



        }

    removerCie(event){
                    let morb=[];
                    let indexaremover:number=this.morbilidadesselec.findIndex(element=>element==event.data.label);
                    
                  this.morbilidadesselec.splice(indexaremover,1)
                  this.codigosSelect.splice(indexaremover,1)
                  morb=this.morbilidadesselec;
                    this.morbilidadesselec=[]
                  
                    morb.forEach(element => {

                      this.morbilidadesselec.push(element)
                      
                    });
                  
                  }


}







