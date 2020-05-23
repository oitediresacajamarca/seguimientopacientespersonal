import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { ButtonModule } from 'primeng/button'
import {FieldsetModule} from 'primeng/fieldset';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';
import { NuevoUsuarioComponent } from './usuarios-admin/nuevo-usuario/nuevo-usuario.component';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { AmbitoAdministrativoSelectComponent } from './ambito-administrativo-select/ambito-administrativo-select.component';

import {ProgressBarModule} from 'primeng/progressbar';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuariosAdminComponent, NuevoUsuarioComponent, AmbitoAdministrativoSelectComponent],
  imports: [
    SidebarModule,
    CommonModule,
    ButtonModule,
    FieldsetModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    CardModule,
    FormsModule

  ]
})
export class UsuariosModule { }
