import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-menu-accion-usuario',
  templateUrl: './menu-accion-usuario.component.html',
  styleUrls: ['./menu-accion-usuario.component.css']
})
export class MenuAccionUsuarioComponent implements OnInit {

  constructor(private msgservicio:ConfirmationService , private usarios:UsuariosService, private estadosse:EstadosService
    ,private messageService: MessageService) { }
  elementosmenu
  msgs: Message[] = [];
  @Input() usuario:any

  ngOnInit() {

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
            this.usarios.eliminarUsuario(this.usuario._id).subscribe(dato=>{
            
              this.messageService.add({severity:'success', summary:'ELIMINACION EXITOSA', detail:'Se elimino correctamente el usuario'});
              this.estadosse.actualizarUsuarios.emit();
            })
           
             
               
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

}
