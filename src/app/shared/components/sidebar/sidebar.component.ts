import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  nombrescompletos:string;
  correoelec:string;

  constructor() { }

  ngOnInit() {
   let dat:any= JSON.parse(localStorage.getItem('datos'));
   this.nombrescompletos=   dat.NOMBRES+' '+dat.APELLIDO_PAT+ ' '+ dat.APELLIDO_MAT;
   this.correoelec=dat.CORREO;
  


  }

}
