import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorFinanciadorComponent } from './selector-financiador.component';

describe('SelectorFinanciadorComponent', () => {
  let component: SelectorFinanciadorComponent;
  let fixture: ComponentFixture<SelectorFinanciadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorFinanciadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorFinanciadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
