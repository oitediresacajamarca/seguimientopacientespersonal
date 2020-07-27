import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGeograficoVerticalComponent } from './selector-geografico-vertical.component';

describe('SelectorGeograficoVerticalComponent', () => {
  let component: SelectorGeograficoVerticalComponent;
  let fixture: ComponentFixture<SelectorGeograficoVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorGeograficoVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorGeograficoVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
