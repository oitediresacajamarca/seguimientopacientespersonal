import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecetaComponent } from './receta/receta.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {
  tratamientos:string[]=[];
  recomendaciones:string[];
  resetamedica:string[];
  @ViewChild('trat',{ static: false}) trat:NgForm
  @ViewChild('receta',{static: false}) receta:RecetaComponent
  @Input()
  visible:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
