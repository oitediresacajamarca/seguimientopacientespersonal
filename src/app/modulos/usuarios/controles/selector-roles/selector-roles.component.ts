import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-selector-roles',
  templateUrl: './selector-roles.component.html',
  styleUrls: ['./selector-roles.component.css']
})
export class SelectorRolesComponent implements OnInit {

  constructor() { }
  roles: SelectItem[];
  rolesselect: string[];

  ngOnInit() {
    this.roles = [{ label: "COORDINADOR", value: "COORDINADOR" }, { label: "PERSONAL", value: "PERSONAL" }, { label: "DIGITADOR", value: "DIGITADOR" }]

  }

}
