import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editar-sol',
  templateUrl: './editar-sol.component.html',
  styleUrls: ['./editar-sol.component.css']
})
export class EditarSolComponent implements OnInit {
  @Input() editarsol:boolean;
  @Input() cod_solicitud:string;

  constructor() { }

  ngOnInit() {
  }

}
