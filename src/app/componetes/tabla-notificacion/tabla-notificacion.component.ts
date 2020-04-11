import { Component, OnInit } from '@angular/core';
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


  constructor(private sol:SolicitudesService) { }

  ngOnInit() {
    this.cols= [
    
    ]
  this.sol.devolverColumnasSolicitudes().subscribe((res)=>{
      this.cols=res.respuesta;    
  })
  
    this.sol.devolverDatosSolicitudes('06').subscribe((datos)=>{

      this.pacientes=datos.respuesta;
    })

  }


}
