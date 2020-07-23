import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDniComponent } from './buscador-dni.component';

describe('BuscadorDniComponent', () => {
  let component: BuscadorDniComponent;
  let fixture: ComponentFixture<BuscadorDniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorDniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
