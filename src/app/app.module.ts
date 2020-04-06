import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaneldeseguimientoComponent } from './paneldeseguimiento/paneldeseguimiento.component';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DistritosService } from './servicios/distritos.service';
import {SpinnerModule} from 'primeng/spinner';
import {SliderModule} from 'primeng/slider';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InplaceModule} from 'primeng/inplace';
import {CheckboxModule} from 'primeng/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    PaneldeseguimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,SpinnerModule
    ,SliderModule,RadioButtonModule,
    ButtonModule,
    TableModule,InplaceModule,
    CheckboxModule
  ],
  providers: [DistritosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
