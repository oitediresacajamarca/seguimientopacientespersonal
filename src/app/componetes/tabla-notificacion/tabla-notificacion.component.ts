import { Component, OnInit, ɵConsole } from '@angular/core';
import { SolicitudesService } from 'src/app/servicios/solicitudes.service';

@Component({
  selector: 'app-tabla-notificacion',
  templateUrl: './tabla-notificacion.component.html',
  styleUrls: ['./tabla-notificacion.component.css']
})
export class TablaNotificacionComponent implements OnInit {
  pacientes:any[];
  pacientesSelected:any[];
  cols:any[]
  displayNotificacion:boolean=true;
  cod_ambito:string;



  constructor(private sol:SolicitudesService) { }

  ngOnInit() {
    this.cols= [
    
    ]
let SESION:any=JSON.parse(localStorage.getItem('datos'));


let distrito:string=SESION.ID_DISTRITO;
    if(SESION.AMBITO=="D"){
      this.cod_ambito=distrito
      
    }
    if(SESION.AMBITO=="P"){
      this.cod_ambito=distrito.substring(1,2);
           
    }

    console.log('QUES'+this.cod_ambito)


  this.sol.devolverColumnasSolicitudes().subscribe((res)=>{
      this.cols=res.respuesta;    
  })
  
    this.sol.devolverDatosSolicitudes('060406').subscribe((datos)=>{
      console.log(datos.respuesta);

      this.pacientes=datos.respuesta;
    })

  }


}
