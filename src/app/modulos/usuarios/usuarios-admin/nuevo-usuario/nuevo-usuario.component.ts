import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  constructor() { }
  @Input()
  verNuevoUsuarios:boolean=false;
  colsambitos:any[];
  ambitoelegidos:any[];

  ngOnInit() {
    this.colsambitos=[
      {header:"Subregion",
      field:"subregion"},
      {header:"RED",
      field:"red"},
      {header:"MICRORED",
      field:"microred"},
      {header:"ESTABLECIMIENTO",
      field:"establecimiento"}

    ]
  }

  buscarPersonal($event){

  }
  aniadirAmbito(e){
    console.log(e);

  }

}
