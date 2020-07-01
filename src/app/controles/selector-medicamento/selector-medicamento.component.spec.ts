import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorMedicamentoComponent } from './selector-medicamento.component';

describe('SelectorMedicamentoComponent', () => {
  let component: SelectorMedicamentoComponent;
  let fixture: ComponentFixture<SelectorMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
