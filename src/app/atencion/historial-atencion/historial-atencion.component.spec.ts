import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAtencionComponent } from './historial-atencion.component';

describe('HistorialAtencionComponent', () => {
  let component: HistorialAtencionComponent;
  let fixture: ComponentFixture<HistorialAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
