import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';

@Component({
  selector: 'app-tabla-notificacion',
  templateUrl: './tabla-notificacion.component.html',
  styleUrls: ['./tabla-notificacion.component.css']
})
export class TablaNotificacionComponent implements OnInit {
  pacientes:any[];
  pacientesSelected:any[];
  cols:any[]
  @Input()
  displayNotificacion:boolean=true;
  cod_ambito:string;



  constructor(private sol:SolicitudesService,private morb:MorbilidadesService) { }

  ngOnInit() {
    this.cols= [
    
    ]
let SESION:any=JSON.parse(localStorage.getItem('datos'));


let distrito:string=SESION.ID_DISTRITO;
    if(SESION.AMBITO=="D"){
      this.cod_ambito=distrito
      
    }
    if(SESION.AMBITO=="P"){
      this.cod_ambito=distrito.substring(0,4);
           
    }
    if(SESION.AMBITO=="R"){
      this.cod_ambito=distrito.substring(0,2);
           
    }

  


  this.sol.devolverColumnasSolicitudes().subscribe((res)=>{
      this.cols=res.respuesta;    

    
  })
  
  let maximo_cie=0;
          this.sol.devolverDatosSolicitudes(this.cod_ambito).subscribe((datos)=>{
              let solicitudes=datos.respuesta;
              let solicitudesedit=[]

              var max_col_sol=0;

              solicitudes.forEach(solicitud => {         
             
                let solicitudedit=solicitud;
                this.morb.devolverMorbildadPaciente(solicitud.ID_PACIENTE).subscribe((dato)=>{
                     max_col_sol=0;
                    let morbilidades=dato.respuesta;
                    morbilidades.forEach((morvilidad) => {

                      max_col_sol=max_col_sol+1;
                      solicitudedit['ID_MEDICAMENTO_'+max_col_sol]=morvilidad.ID_MEDICAMENTO;
                      solicitudedit['ID_CIE_'+max_col_sol]=morvilidad.ID_CIE;
                      
                        if(max_col_sol>maximo_cie){                           
                          
                            maximo_cie=max_col_sol;
                            let col={'header':'ID_MEDICAMENTO_'+maximo_cie,'field':'ID_MEDICAMENTO_'+maximo_cie};
                            this.cols.push(col);
                            col=  {'header':'ID_CIE_'+maximo_cie,'field':'ID_CIE_'+maximo_cie};
                            this.cols.push(col);
                            console.log('LEGANO'+max_col_sol);            

                        }






                      
                    });


                    
                });
                
               
               
                
              });


            
          

             this.pacientes=solicitudes;


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

}
