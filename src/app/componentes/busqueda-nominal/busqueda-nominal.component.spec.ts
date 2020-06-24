import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaNominalComponent } from './busqueda-nominal.component';

describe('BusquedaNominalComponent', () => {
  let component: BusquedaNominalComponent;
  let fixture: ComponentFixture<BusquedaNominalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaNominalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaNominalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
