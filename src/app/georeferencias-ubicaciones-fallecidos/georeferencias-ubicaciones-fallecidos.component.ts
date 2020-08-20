import { Component, OnInit, ViewChild } from '@angular/core';
import { GMap, MessageService } from 'primeng';
import { CovidRefService } from '../servicios/covid-ref.service';
import { DistritosService } from '../servicios/distritos.service';
declare var google: any; //new added line 
@Component({
  selector: 'app-georeferencias-ubicaciones-fallecidos',
  templateUrl: './georeferencias-ubicaciones-fallecidos.component.html',
  styleUrls: ['./georeferencias-ubicaciones-fallecidos.component.css']
})
export class GeoreferenciasUbicacionesFallecidosComponent implements OnInit {

  constructor(private messageService: MessageService,
    private covid: CovidRefService,
    private georefs: DistritosService) { }
  options: any;

  overlays: any[] = [];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;
  gradiente

  draggable: boolean;
  heatmapdata: any[] = []
  @ViewChild('gmap3', { static: false }) falle: GMap
  ngOnInit() {
    this.options = {
      center: { lat: -6.4341326741444, lng: -78.70264353085936 },
      zoom: 8,
    };
    this.gradiente = [
      "rgba(0, 255, 255, 0)",
      "rgba(0, 255, 255, 1)",
      "rgba(0, 191, 255, 1)",
      "rgba(0, 127, 255, 1)",
      "rgba(0, 63, 255, 1)",
      "rgba(0, 60, 255, 1)",
      "rgba(0, 50, 255, 1)",
      "rgba(0, 40, 255, 1)",
      "rgba(0, 30, 255, 1)",
      "rgba(0, 20, 255, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(0, 0, 223, 1)",
      "rgba(0, 0, 191, 1)",
      "rgba(0, 0, 159, 1)",
      "rgba(0, 0, 127, 1)",
      "rgba(63, 0, 91, 1)",
      "rgba(127, 0, 63, 1)",
      "rgba(191, 0, 31, 1)",
      "rgba(255, 0, 0, 1)",
      "rgba(0, 0, 0, 1)",
      "rgba(0, 10, 0, 1)",
      "rgba(0, 30, 0, 1)",
      "rgba(0, 40, 0, 1)",
      "rgba(0, 50, 0, 1)",
      "rgba(0, 70, 0, 1)",
      "rgba(0, 90, 0, 1)",
      "rgba(0, 190, 0, 1)",
      "rgba(0, 255, 0, 1)",
    ];
    this.cargarGeoreferencias()
  }

  cargarGeoreferencias() {


    this.covid.devolverGeoReferenciasFallecidos().subscribe((geo) => {
      geo.forEach(element => {
        this.overlays.push(new google.maps.Marker({ position: { lat: element.lat, lng: element.lng }, title: "Konyaalti" }))
      });
    })



  }

}
