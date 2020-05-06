import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaPadronComponent } from './sistema-padron.component';

describe('SistemaPadronComponent', () => {
  let component: SistemaPadronComponent;
  let fixture: ComponentFixture<SistemaPadronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaPadronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaPadronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
