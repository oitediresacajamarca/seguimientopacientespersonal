import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorRolesComponent } from './selector-roles.component';

describe('SelectorRolesComponent', () => {
  let component: SelectorRolesComponent;
  let fixture: ComponentFixture<SelectorRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
