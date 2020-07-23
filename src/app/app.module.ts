import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DistritosService } from './servicios/distritos.service';
import { SpinnerModule } from 'primeng/spinner';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InplaceModule } from 'primeng/inplace';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { ChipsModule } from 'primeng/chips';
import { TablaMorbilidadesComponent } from './componentes/tabla-morbilidades/tabla-morbilidades.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PickListModule } from 'primeng/picklist';
import { LightboxModule } from 'primeng/lightbox';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { AccesoComponent } from './componentes/acceso/acceso.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { CaptchaModule } from 'primeng/captcha';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, SharedModule } from 'primeng';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PrincipalComponent } from './componentes/atencion/principal.component';
import { TabViewModule } from 'primeng/tabview';
import { MorbilidadesPorPacienteComponent } from './componentes/morbilidades-por-paciente/morbilidades-por-paciente.component';
import { RegistrarAtencionComponent } from './componentes/registrar-atencion/registrar-atencion.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { StepsModule } from 'primeng/steps';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GMapModule } from 'primeng/gmap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PublicComponent } from './componentes/public/public.component';
import { DefaultModule } from './layouts/default/default.module';
import { FormatofuatComponent } from './componentes/formatos/formatofuat/formatofuat.component';
import { TablaCieSelecComponent } from './componentes/tabla-cie-selec/tabla-cie-selec.component';
import { ConsentimientoInformadoComponent } from './componentes/formatos/consentimiento-informado/consentimiento-informado.component';
import { SistemaPadronComponent } from './componentes/sistema-padron/sistema-padron.component';
import { DatosAtencionComponent } from './componentes/registrar-atencion/datos-atencion/datos-atencion.component';
import { DiagnosticosComponent } from './componentes/registrar-atencion/diagnosticos/diagnosticos.component';
import { TratamientoComponent } from './componentes/registrar-atencion/tratamiento/tratamiento.component';
import { FormularioVerificarComponent } from './componentes/public/formulario-verificar/formulario-verificar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { GeoreferenciaComponent } from './georeferencia/georeferencia.component';
import { SelectorCieCpmsComponent } from './controles/selector-cie-cpms/selector-cie-cpms.component';
import { AtencionesRealizadasComponent } from './componentes/atencion/atenciones-realizadas/atenciones-realizadas.component';
import { DetalleAtencionComponent } from './componentes/atencion/atenciones-realizadas/detalle-atencion/detalle-atencion.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {InputNumberModule} from 'primeng/inputnumber';

import { MultiSelectModule } from 'primeng/multiselect';

import { HistorialAtencionComponent } from './atencion/historial-atencion/historial-atencion.component';
import { DataViewModule } from 'primeng/dataview';
import { BusquedaNominalComponent } from './componentes/busqueda-nominal/busqueda-nominal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecetaComponent } from './componentes/registrar-atencion/tratamiento/receta/receta.component';
import { SelectorMedicamentoComponent } from './controles/selector-medicamento/selector-medicamento.component';
import {ToolbarModule} from 'primeng/toolbar';
import { MenuAccionAtencionComponent } from './controles/menu-accion-atencion/menu-accion-atencion.component';
import { TicketRecetaComponent } from './impresiones/ticket-receta/ticket-receta.component';
import { IpressService } from './servicios/ipress.service';
import { SelectorIpressHorizontalComponent } from './controles/selector-ipress-horizontal/selector-ipress-horizontal.component';
import { PersonaComponent } from './formularios/persona/persona.component';
import { BuscadorDniComponent } from './controles/buscador-dni/buscador-dni.component';




@NgModule({
  entryComponents: [
    SelectorMedicamentoComponent
  ],
  declarations: [
  
    AppComponent,
    PaneldeseguimientoComponent,
    TablaMorbilidadesComponent,
    PrincipalComponent,
    AccesoComponent,
    MorbilidadesPorPacienteComponent,
    RegistrarAtencionComponent,
    InicioComponent,
    PublicComponent,
    FormatofuatComponent,
    TablaCieSelecComponent,
    ConsentimientoInformadoComponent,
    SistemaPadronComponent,
    DatosAtencionComponent,
    DiagnosticosComponent,
    TratamientoComponent,
    FormularioVerificarComponent,
    GeoreferenciaComponent,
    SelectorCieCpmsComponent,
    AtencionesRealizadasComponent,
    DetalleAtencionComponent,


    HistorialAtencionComponent,

    BusquedaNominalComponent,

    RecetaComponent,

    SelectorMedicamentoComponent,

    MenuAccionAtencionComponent,

    TicketRecetaComponent,

    SelectorIpressHorizontalComponent,

    PersonaComponent,

    BuscadorDniComponent,

 

  ],
  imports: [
    GMapModule,
    StepsModule,
    PickListModule,
    KeyFilterModule,
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    HttpClientModule, SpinnerModule
    , SliderModule, RadioButtonModule,
    ButtonModule,
    TableModule, InplaceModule,
    CheckboxModule, ScrollPanelModule,
    FieldsetModule,
    ListboxModule, ChipsModule, ProgressBarModule,
    DialogModule,
    InputMaskModule,
    CalendarModule, CaptchaModule, ContextMenuModule,
    TabViewModule, ConfirmDialogModule,
    ToastModule, MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule
    , FlexLayoutModule, MessagesModule, MessageModule, MatCardModule,
    SharedModule,
    DefaultModule,
    MatFormFieldModule,
    LightboxModule, SidebarModule, CardModule,
    MatCheckboxModule,
    UsuariosModule,
    OverlayPanelModule,
    TieredMenuModule, ToastModule,
    PdfViewerModule, MultiSelectModule, DataViewModule, ReactiveFormsModule,ToolbarModule
  ],
  providers: [DistritosService, ConfirmationService, MessageService,IpressService],

  bootstrap: [AppComponent]
})
export class AppModule { }
