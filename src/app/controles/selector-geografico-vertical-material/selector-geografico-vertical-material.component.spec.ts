import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGeograficoVerticalMaterialComponent } from './selector-geografico-vertical-material.component';

describe('SelectorGeograficoVerticalMaterialComponent', () => {
  let component: SelectorGeograficoVerticalMaterialComponent;
  let fixture: ComponentFixture<SelectorGeograficoVerticalMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorGeograficoVerticalMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorGeograficoVerticalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
