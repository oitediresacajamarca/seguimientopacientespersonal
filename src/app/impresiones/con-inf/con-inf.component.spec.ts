import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConInfComponent } from './con-inf.component';

describe('ConInfComponent', () => {
  let component: ConInfComponent;
  let fixture: ComponentFixture<ConInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
