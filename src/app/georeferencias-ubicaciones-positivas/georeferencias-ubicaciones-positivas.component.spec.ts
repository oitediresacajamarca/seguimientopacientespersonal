import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferenciasUbicacionesPositivasComponent } from './georeferencias-ubicaciones-positivas.component';

describe('GeoreferenciasUbicacionesPositivasComponent', () => {
  let component: GeoreferenciasUbicacionesPositivasComponent;
  let fixture: ComponentFixture<GeoreferenciasUbicacionesPositivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoreferenciasUbicacionesPositivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoreferenciasUbicacionesPositivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
