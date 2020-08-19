import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CpmsFullService } from 'src/app/servicios/cpms-full.service';


@Component({
  selector: 'app-buscador-cpms',
  templateUrl: './buscador-cpms.component.html',
  styleUrls: ['./buscador-cpms.component.css']
})

export class BuscadorCpmsComponent implements OnInit {
  @Output() buscoCpms = new EventEmitter<any>()
  constructor(private cpmsfulls: CpmsFullService) { }
  NombreBuscar: string
  Buscar() {
    this.cpmsfulls.devolverCpms(this.NombreBuscar).subscribe((datos) => { console.log(datos) })
  }
  ngOnInit() {
  }

}
