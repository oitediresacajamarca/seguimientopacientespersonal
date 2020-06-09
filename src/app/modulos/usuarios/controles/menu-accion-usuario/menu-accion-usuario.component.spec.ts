import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccionUsuarioComponent } from './menu-accion-usuario.component';

describe('MenuAccionUsuarioComponent', () => {
  let component: MenuAccionUsuarioComponent;
  let fixture: ComponentFixture<MenuAccionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAccionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAccionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
