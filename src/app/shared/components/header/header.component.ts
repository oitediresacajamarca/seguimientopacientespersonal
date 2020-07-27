import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EstadosService } from 'src/app/servicios/estados.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() notiA: EventEmitter<any> = new EventEmitter();


  constructor(private estado:EstadosService,private router :Router) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  abrirNotificaciones(){
    this.estado.actualizarNotificacione.emit();
 
  
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
    


  }
  abrirEmergenteCambiarContra(){
  

    this.router.navigate([{ outlets: { emergente: 'actualizar' }}]);

   
  }
  abrirEmergenteNuevaSolicitud(){
    this.router.navigate([{ outlets: { emergente: 'NuevaSolicitud' }}]);
  }

}
