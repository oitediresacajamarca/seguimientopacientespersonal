import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = false;

  displayNotificacion=true;

  constructor() { }

  ngOnInit() { 

    
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  noti(){  
    
    this.displayNotificacion=true;
  }
  manejarnot(e){
    this.displayNotificacion=false;
  }
}
