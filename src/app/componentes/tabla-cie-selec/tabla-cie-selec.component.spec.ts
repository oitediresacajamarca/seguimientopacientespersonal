import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCieSelecComponent } from './tabla-cie-selec.component';

describe('TablaCieSelecComponent', () => {
  let component: TablaCieSelecComponent;
  let fixture: ComponentFixture<TablaCieSelecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCieSelecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCieSelecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
