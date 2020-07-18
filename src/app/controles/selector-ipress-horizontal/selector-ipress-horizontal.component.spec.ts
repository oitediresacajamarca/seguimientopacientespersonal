import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorIpressHorizontalComponent } from './selector-ipress-horizontal.component';

describe('SelectorIpressHorizontalComponent', () => {
  let component: SelectorIpressHorizontalComponent;
  let fixture: ComponentFixture<SelectorIpressHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorIpressHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorIpressHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
