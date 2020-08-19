import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesApoyoComponent } from './examenes-apoyo.component';

describe('ExamenesApoyoComponent', () => {
  let component: ExamenesApoyoComponent;
  let fixture: ComponentFixture<ExamenesApoyoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesApoyoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
