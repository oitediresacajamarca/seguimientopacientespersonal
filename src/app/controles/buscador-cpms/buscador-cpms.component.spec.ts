import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCpmsComponent } from './buscador-cpms.component';

describe('BuscadorCpmsComponent', () => {
  let component: BuscadorCpmsComponent;
  let fixture: ComponentFixture<BuscadorCpmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorCpmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCpmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
