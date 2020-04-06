import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneldeseguimientoComponent } from './paneldeseguimiento.component';

describe('PaneldeseguimientoComponent', () => {
  let component: PaneldeseguimientoComponent;
  let fixture: ComponentFixture<PaneldeseguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneldeseguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneldeseguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
