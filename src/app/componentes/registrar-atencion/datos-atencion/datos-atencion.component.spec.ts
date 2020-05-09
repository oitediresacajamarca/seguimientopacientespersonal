import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAtencionComponent } from './datos-atencion.component';

describe('DatosAtencionComponent', () => {
  let component: DatosAtencionComponent;
  let fixture: ComponentFixture<DatosAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
