import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Message } from 'primeng/api/message';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api'
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
 
  columnasUsuarios: any[];
  usuariosDatos: any;
  elementosmenu
  msgs: Message[] = [];


  @ViewChild('app-nuevo-usuario', { static: false }) formN: NuevoUsuarioComponent

  constructor(private usuas: UsuariosService,private msgservicio:ConfirmationService, private estado:EstadosService) { }

  ngOnInit() {
    this.columnasUsuarios = [
   
      { field: "numero_doc", header: "NUMERO DE DOCUMENTO" },
      { field: "tipo_doc", header: "TIPO DE DOCUMENTO" },
      { field: "FUNCION", header: "FUNCION O CARGO" },
      { field: "APELLIDO_PAT", header: "APELLIDO PATERNO " },
      { field: "APELLIDO_MAT", header: "APELLIDO MATERNO" },
      { field: "NOMBRES", header: "NOMBRES" },
      { field: "CORREO", header: "CORREO" },
      { field: "TELEFONO", header: "TELEFONO" },
      { field: "roles", header: "ROLES" },
    ]
    this.estado.actualizarUsuarios.subscribe(()=>{this.CargarUsuarios()})
    this.CargarUsuarios()
    this.elementosmenu = [
      {
        label: 'ADMINISTRAR',
        items: [
        { label: 'ASIGNAR AMBITOS',icon: 'pi pi-fw pi-plus'},
        { label: 'ASIGNAR ROLES' ,icon: 'pi pi-fw pi-plus'},
        { label: 'DAR DE BAJA' ,icon: 'pi pi-fw pi-minus', command:()=>{
          this.msgservicio.confirm({
            message: 'Uste esta seguro de dar de baja a este usuario?',
            header: 'Confimacion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
             
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });

        }}
        ]
      }
    ];


  }


  CargarUsuarios() {
    this.usuas.devolverUsuariosAmbitos().subscribe(
      datos => {

        this.usuariosDatos = datos;

      }


    )


  }

}
