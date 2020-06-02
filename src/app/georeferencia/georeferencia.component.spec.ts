import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferenciaComponent } from './georeferencia.component';

describe('GeoreferenciaComponent', () => {
  let component: GeoreferenciaComponent;
  let fixture: ComponentFixture<GeoreferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoreferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoreferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
