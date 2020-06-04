import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() notiA: EventEmitter<any> = new EventEmitter();


  constructor(private estado:EstadosService) { }

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
    this.notiA.emit();
  
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
    


  }

}
