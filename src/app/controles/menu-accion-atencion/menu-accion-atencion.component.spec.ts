import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccionAtencionComponent } from './menu-accion-atencion.component';

describe('MenuAccionAtencionComponent', () => {
  let component: MenuAccionAtencionComponent;
  let fixture: ComponentFixture<MenuAccionAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAccionAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAccionAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
