import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNotificacionComponent } from './tabla-notificacion.component';

describe('TablaNotificacionComponent', () => {
  let component: TablaNotificacionComponent;
  let fixture: ComponentFixture<TablaNotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaNotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
