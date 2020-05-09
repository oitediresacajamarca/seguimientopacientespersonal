import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {
  tratamientos:string[];
  recomendaciones:string[];
  resetamedica:string[];
  @Input()
  visible:boolean=false;

  constructor() { }

  ngOnInit() {
  }

}
