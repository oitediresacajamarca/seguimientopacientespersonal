import { Component, OnInit, ViewChild } from '@angular/core';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
  columnasUsuarios: any[];
  usuariosDatos: any[];


  @ViewChild('app-nuevo-usuario',{static:false}) formN:NuevoUsuarioComponent

  constructor() { }

  ngOnInit() {
    this.columnasUsuarios = [
      { field: "menu", header: "" },
      { field: "numero_doc", header: "NUMERO DE DOCUMENTO" },
      { field: "tipo_doc", header: "TIPO DE DOCUMENTO" },
      { field: "FUNCION", header: "FUNCION O CARGO" },
      { field: "APELLIDO_PAT", header: "APELLIDO PATERNO " },
      { field: "APELLIDO_MAT", header: "APELLIDO MATERNO" },
      { field: "NOMBRES", header: "NOMBRES" },
      { field: "CORREO", header: "CORREO" },
      { field: "TELEFONO", header: "TELEFONO" }
    ]
  }

}
