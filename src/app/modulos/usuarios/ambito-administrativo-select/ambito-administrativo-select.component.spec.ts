import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbitoAdministrativoSelectComponent } from './ambito-administrativo-select.component';

describe('AmbitoAdministrativoSelectComponent', () => {
  let component: AmbitoAdministrativoSelectComponent;
  let fixture: ComponentFixture<AmbitoAdministrativoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbitoAdministrativoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbitoAdministrativoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
