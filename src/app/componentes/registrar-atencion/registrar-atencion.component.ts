import { Component, OnInit, Input } from '@angular/core';
import { AtencionService } from 'src/app/servicios/atencion.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  fechaatencion:Date=new Date()
  @Input() cod_paciente:string
  @Input() visible:boolean;
  @Input()  ID_PACIENTE:string;
  @Input()  ID_SOLICITUD:string;
  motivoAte:string;
  casocovit:boolean;
  tipocov:string;
  trabajador_id:string;
sesion:any;
  constructor( private aten:AtencionService,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit() {
    this.sesion=JSON.parse(localStorage.getItem('datos'));

    this.trabajador_id=this.sesion.TRABAJADOR_ID;
  }



  registrarAtencion(event){
   

    let fechacadena=this.fechaatencion.getDate()+'/'+(this.fechaatencion.getMonth()+1).toString()+'/'+this.fechaatencion.getFullYear();
    let casocovi='N'
    if(this.casocovit){
      let casocovi='S'

    }

      this.confirmationService.confirm({
        message: 'Esta seguro de que deseas Guardar la Atencion',
        accept: () => {
            //Actual logic to perform a confirmation
            this.aten.registrar(this.trabajador_id,fechacadena,this.ID_PACIENTE,'0',casocovi,this.tipocov).subscribe((datos)=>{
              this.messageService.add({severity:'success', summary:'Se realizo con exito', detail:'SE GUARDO CON EXITO EL REGISTRO DE LA ATENCION'});
              this.visible=false;
          
            });
        }
      })
        

  }
  

}
