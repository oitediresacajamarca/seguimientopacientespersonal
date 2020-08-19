import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cmps-selector-tabla',
  templateUrl: './cmps-selector-tabla.component.html',
  styleUrls: ['./cmps-selector-tabla.component.css']
})
export class CmpsSelectorTablaComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource =[
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    
  ];
  ngOnInit() {
  }

}
