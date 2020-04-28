import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentimientoInformadoComponent } from './consentimiento-informado.component';

describe('ConsentimientoInformadoComponent', () => {
  let component: ConsentimientoInformadoComponent;
  let fixture: ComponentFixture<ConsentimientoInformadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentimientoInformadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentimientoInformadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
