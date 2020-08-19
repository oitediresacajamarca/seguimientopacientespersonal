import { Directive, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[appClickColor]'
})
export class ClickColorDirective {
  @Input('appClickColor') fila: any={}
  constructor(private elementref: ElementRef) { }
  @HostListener('click') cambiarColor() {
    /* reseteo el estilo letra negra y fondo blanco*/
    for (let index = 1; index < this.elementref.nativeElement.parentElement.children.length; index++) {
      this.elementref.nativeElement.parentElement.children[index].style.backgroundColor = 'white'
      this.elementref.nativeElement.style.color = 'black'

    }

    /* establesco los estilos a la fila*/
    this.elementref.nativeElement.style.backgroundColor = 'red'
    this.elementref.nativeElement.style.color = '#FFFFFF'
    console.log(this.elementref)
    this.click.emit(this.fila)



  }
  @Output('selecciono') click = new EventEmitter<any>()

}
