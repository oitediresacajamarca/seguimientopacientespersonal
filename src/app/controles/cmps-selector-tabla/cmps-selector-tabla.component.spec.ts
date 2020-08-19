import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpsSelectorTablaComponent } from './cmps-selector-tabla.component';

describe('CmpsSelectorTablaComponent', () => {
  let component: CmpsSelectorTablaComponent;
  let fixture: ComponentFixture<CmpsSelectorTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpsSelectorTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpsSelectorTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
