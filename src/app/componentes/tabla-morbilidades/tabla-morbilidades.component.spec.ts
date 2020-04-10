import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMorbilidadesComponent } from './tabla-morbilidades.component';

describe('TablaMorbilidadesComponent', () => {
  let component: TablaMorbilidadesComponent;
  let fixture: ComponentFixture<TablaMorbilidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaMorbilidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMorbilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
