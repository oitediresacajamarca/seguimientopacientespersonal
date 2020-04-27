import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { TablaNotificacionComponent } from 'src/app/componetes/tabla-notificacion/tabla-notificacion.component';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,TablaNotificacionComponent
  ],
  imports: [
    ButtonModule,
    ScrollPanelModule,
    TableModule,
    CommonModule,
    DialogModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    PanelModule,
    ContextMenuModule,
    MatFormFieldModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
