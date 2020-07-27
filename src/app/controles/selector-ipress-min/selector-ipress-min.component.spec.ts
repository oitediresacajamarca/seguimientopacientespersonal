import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorIpressMinComponent } from './selector-ipress-min.component';

describe('SelectorIpressMinComponent', () => {
  let component: SelectorIpressMinComponent;
  let fixture: ComponentFixture<SelectorIpressMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorIpressMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorIpressMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
