import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesRealizadasComponent } from './atenciones-realizadas.component';

describe('AtencionesRealizadasComponent', () => {
  let component: AtencionesRealizadasComponent;
  let fixture: ComponentFixture<AtencionesRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionesRealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
