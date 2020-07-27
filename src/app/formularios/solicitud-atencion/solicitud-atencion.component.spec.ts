import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAtencionComponent } from './solicitud-atencion.component';

describe('SolicitudAtencionComponent', () => {
  let component: SolicitudAtencionComponent;
  let fixture: ComponentFixture<SolicitudAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
