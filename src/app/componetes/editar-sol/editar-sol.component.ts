import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { SelectorIpressComponent } from 'src/app/controles/selector-ipress/selector-ipress.component';
import { SolicitudService } from 'src/app/servicios/servicios/solicitud.service';

@Component({
  selector: 'app-editar-sol',
  templateUrl: './editar-sol.component.html',
  styleUrls: ['./editar-sol.component.css']
})
export class EditarSolComponent implements OnInit {
  @Input() editarsol: boolean;
  @Input() cod_solicitud: string;
  @Input() solicitud: any = { DESCRIPCION: '', COD_IPRESS: '' };
  @ViewChild('selecipres', { static: true }) selecipres: SelectorIpressComponent
  @Output() actualiso:EventEmitter<any> = new EventEmitter()

  constructor(private solicitudser: SolicitudService) { }

  ngOnInit() {

  }

  editar(e) {
    console.log(this.cod_solicitud)
    let consulta = { DESCRIPCION: this.solicitud.DESCRIPCION, ID_IPRESS: this.selecipres.establecimiento_seleccionado }
    console.log(consulta)
    this.solicitudser.editarSolicitud(this.cod_solicitud, consulta).subscribe(
      dato => { console.log(dato) 
      
      this.actualiso.emit(dato);
      
      }

    );
  }

}
