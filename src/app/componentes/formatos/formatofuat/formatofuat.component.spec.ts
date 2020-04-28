import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatofuatComponent } from './formatofuat.component';

describe('FormatofuatComponent', () => {
  let component: FormatofuatComponent;
  let fixture: ComponentFixture<FormatofuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatofuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatofuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
