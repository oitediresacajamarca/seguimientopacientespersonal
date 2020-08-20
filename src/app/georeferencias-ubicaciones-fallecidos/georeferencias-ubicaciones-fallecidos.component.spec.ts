import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferenciasUbicacionesFallecidosComponent } from './georeferencias-ubicaciones-fallecidos.component';

describe('GeoreferenciasUbicacionesFallecidosComponent', () => {
  let component: GeoreferenciasUbicacionesFallecidosComponent;
  let fixture: ComponentFixture<GeoreferenciasUbicacionesFallecidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoreferenciasUbicacionesFallecidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoreferenciasUbicacionesFallecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
