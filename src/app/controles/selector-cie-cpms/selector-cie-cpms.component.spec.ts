import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCieCpmsComponent } from './selector-cie-cpms.component';

describe('SelectorCieCpmsComponent', () => {
  let component: SelectorCieCpmsComponent;
  let fixture: ComponentFixture<SelectorCieCpmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorCieCpmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCieCpmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
