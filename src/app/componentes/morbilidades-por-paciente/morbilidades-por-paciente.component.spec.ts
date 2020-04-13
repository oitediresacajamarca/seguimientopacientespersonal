import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorbilidadesPorPacienteComponent } from './morbilidades-por-paciente.component';

describe('MorbilidadesPorPacienteComponent', () => {
  let component: MorbilidadesPorPacienteComponent;
  let fixture: ComponentFixture<MorbilidadesPorPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorbilidadesPorPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorbilidadesPorPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
