import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CovidRefService } from '../servicios/covid-ref.service';
import { GMap } from 'primeng';

declare var google: any; //new added line 

@Component({
    selector: 'app-georeferencia',
    templateUrl: './georeferencia.component.html',
    styleUrls: ['./georeferencia.component.css']
})
export class GeoreferenciaComponent implements OnInit {

    constructor(private messageService: MessageService, private covid: CovidRefService) { }

    options: any;

    overlays: any[] = [];

    dialogVisible: boolean;

    markerTitle: string;

    selectedPosition: any;

    infoWindow: any;

    draggable: boolean;
    heatmapdata: any[] = []
    @ViewChild('gmap', { static: false }) map: GMap

    async ngOnInit() {

        this.options = {
            center: { lat: -6.4341326741444, lng: -78.70264353085936 },
            zoom: 8,
            data: []
        };

        this.cargarGeoreferencias()


    }
    cargarGeoreferencias() {


        this.covid.devolverGeoReferencias().subscribe((geo) => {
            geo.forEach(element => {
                //         this.overlays.push(new google.maps.Marker({ position: { lat: element.lat, lng: element.lng }, title: "Konyaalti" }))

                this.heatmapdata.push({ location: new google.maps.LatLng(element.lat, element.lng), weight: 250 });
            });
            console.log(this.heatmapdata)
            var g = [
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
            this.overlays.push(new google.maps.visualization.HeatmapLayer({
                data: this.heatmapdata,

                dissipating: true,
                opacity: 1,
                radius: 100

            })
            )



        })



    }

    handleMapClick(event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    }

    handleOverlayClick(event) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.messageService.add({ severity: 'info', summary: 'Marcar Zona', detail: title });
        }
        else {
            this.messageService.add({ severity: 'info', summary: 'Shape Selected', detail: '' });
        }
    }

    addMarker() {
        this.overlays.push(new google.maps.Marker({ position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }, title: this.markerTitle, draggable: this.draggable }));
        this.markerTitle = null;
        this.dialogVisible = false;
    }

    handleDragEnd(event) {
        this.messageService.add({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
    }


    initOverlays() {
        var heatmapData = [
            new google.maps.LatLng(-7.1606346, -78.5392219),
            new google.maps.LatLng(-7.1606312, -78.5392219),
            new google.maps.LatLng(-7.1678435, -78.5152423),
            new google.maps.LatLng(-7.1606346, -78.5392219),
        ];


        if (!this.overlays || !this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
                new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
                new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
                new google.maps.Polygon({
                    paths: [
                        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
                    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
                new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 }),
                new google.maps.visualization.HeatmapLayer({
                    data: this.heatmapdata,
                })
            ];
        }

    }

    zoomIn(map) {
        map.setZoom(map.getZoom() + 1);
    }

    zoomOut(map) {
        map.setZoom(map.getZoom() - 1);
    }

    clear() {
        var heatmapData = [
            new google.maps.LatLng(-7.1606346, -78.5392219),
            new google.maps.LatLng(-7.1606312, -78.5392219),
            new google.maps.LatLng(-7.1678435, -78.5152423),
            new google.maps.LatLng(-7.1606346, -78.5392219),
        ];


        this.overlays = [
            new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
            new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
            })
        ];
    }

    CargarDistrito(e) {
        console.log(e)
    }

}
