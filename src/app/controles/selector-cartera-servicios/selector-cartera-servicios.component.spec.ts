import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCarteraServiciosComponent } from './selector-cartera-servicios.component';

describe('SelectorCarteraServiciosComponent', () => {
  let component: SelectorCarteraServiciosComponent;
  let fixture: ComponentFixture<SelectorCarteraServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorCarteraServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCarteraServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
