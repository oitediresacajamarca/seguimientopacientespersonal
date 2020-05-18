import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVerificarComponent } from './formulario-verificar.component';

describe('FormularioVerificarComponent', () => {
  let component: FormularioVerificarComponent;
  let fixture: ComponentFixture<FormularioVerificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioVerificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioVerificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
