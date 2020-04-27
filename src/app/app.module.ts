import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import {DistritosService } from './servicios/distritos.service';
import {SpinnerModule} from 'primeng/spinner';
import {SliderModule} from 'primeng/slider';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InplaceModule} from 'primeng/inplace';
import {CheckboxModule} from 'primeng/checkbox';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {FieldsetModule} from 'primeng/fieldset';
import {ListboxModule} from 'primeng/listbox';
import {ChipsModule} from 'primeng/chips';
import {TablaMorbilidadesComponent } from './componentes/tabla-morbilidades/tabla-morbilidades.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {MatFormFieldModule} from '@angular/material/form-field';


import {DialogModule} from 'primeng/dialog';
import {AccesoComponent } from './componentes/acceso/acceso.component';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {CaptchaModule} from 'primeng/captcha';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, SharedModule } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { PrincipalComponent } from './componentes/atencion/principal.component';
import { TabViewModule} from 'primeng/tabview';
import { MorbilidadesPorPacienteComponent } from './componentes/morbilidades-por-paciente/morbilidades-por-paciente.component';
import { RegistrarAtencionComponent } from './componentes/registrar-atencion/registrar-atencion.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import {KeyFilterModule} from 'primeng/keyfilter';


import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';




import {MatSidenavModule} from '@angular/material/sidenav';

import { PublicComponent } from './componentes/public/public.component';
import { DefaultModule } from './layouts/default/default.module';

@NgModule({
  declarations: [
    AppComponent,
    PaneldeseguimientoComponent,
    TablaMorbilidadesComponent,
  
    PrincipalComponent,
    AccesoComponent,
    MorbilidadesPorPacienteComponent,
    RegistrarAtencionComponent,
    InicioComponent,

   
  
    PublicComponent

  ],
  imports: [
    KeyFilterModule,
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,SpinnerModule
    ,SliderModule,RadioButtonModule,
    ButtonModule,
    TableModule,InplaceModule,
    CheckboxModule,ScrollPanelModule,
    FieldsetModule,
    ListboxModule,ChipsModule,ProgressBarModule,
    DialogModule,
    InputMaskModule,    
    CalendarModule,CaptchaModule,ContextMenuModule,
    TabViewModule,ConfirmDialogModule,
    ToastModule,MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule
    ,FlexLayoutModule,MessagesModule,MessageModule,MatCardModule,
    SharedModule,
    DefaultModule,
    MatFormFieldModule
    

    
  ],
  providers: [DistritosService,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
