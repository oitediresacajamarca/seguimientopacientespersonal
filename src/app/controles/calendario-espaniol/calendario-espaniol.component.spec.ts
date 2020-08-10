import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEspaniolComponent } from './calendario-espaniol.component';

describe('CalendarioEspaniolComponent', () => {
  let component: CalendarioEspaniolComponent;
  let fixture: ComponentFixture<CalendarioEspaniolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioEspaniolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioEspaniolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
