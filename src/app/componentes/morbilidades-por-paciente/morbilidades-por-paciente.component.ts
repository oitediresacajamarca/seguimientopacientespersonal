import { Component, OnInit, Input } from '@angular/core';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';

@Component({
  selector: 'app-morbilidades-por-paciente',
  templateUrl: './morbilidades-por-paciente.component.html',
  styleUrls: ['./morbilidades-por-paciente.component.css']
})
export class MorbilidadesPorPacienteComponent implements OnInit {

  morbilidadesdepaciente:any;
  constructor(private mor:MorbilidadesService) { }
  @Input('dni') dni:string

  ngOnInit() {
    this.mor.devolverMorbildadPaciente(this.dni).subscribe((dat)=>{

    

    })

  }
  
  actualizarDatos(cod_pac:string){
    this.morbilidadesdepaciente=[]

    this.mor.devolverMorbildadDetalladoPaciente(cod_pac).subscribe((dat)=>{
      console.log(dat.respuesta)
      dat.respuesta.forEach(element => {
        let nueva :any={};
        Object.assign(nueva,element);
        nueva.COD_MORBILIDAD=element.ID_CIE;
        nueva.MORBILIDAD=element.Descripcion_Item;
        nueva.COD_MED='';
        nueva.NOMBRE_MEDICAMENTO='';    
        this.morbilidadesdepaciente.push(nueva)
      })

    

    })
  }
  
}
