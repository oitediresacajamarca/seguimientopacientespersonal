import { Directive, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[appClickColor]'
})
export class ClickColorDirective {
@Input('fila') fila:any
  constructor(private elementref: ElementRef) { }
  @HostListener('click') cambiarColor($event) {
    console.log(this.fila)
    this.elementref.nativeElement.style.backgroundColor  = 'red'
    this.elementref.nativeElement.style.color  = '#FFFFFF'
    this.click.emit()
  }
  @Output('selecciono') click= new EventEmitter<any>()

}
