import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-notificacion',
  templateUrl: './tabla-notificacion.component.html',
  styleUrls: ['./tabla-notificacion.component.css']
})
export class TablaNotificacionComponent implements OnInit {
  customers:any[];
  selectedCustomers:any[];


  constructor() { }

  ngOnInit() {
  }

}
