import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDerivacionComponent } from './form-derivacion.component';

describe('FormDerivacionComponent', () => {
  let component: FormDerivacionComponent;
  let fixture: ComponentFixture<FormDerivacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDerivacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDerivacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
