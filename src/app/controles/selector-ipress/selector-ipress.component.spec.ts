import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorIpressComponent } from './selector-ipress.component';

describe('SelectorIpressComponent', () => {
  let component: SelectorIpressComponent;
  let fixture: ComponentFixture<SelectorIpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorIpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
