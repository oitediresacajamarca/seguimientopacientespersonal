import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRecetaComponent } from './ticket-receta.component';

describe('TicketRecetaComponent', () => {
  let component: TicketRecetaComponent;
  let fixture: ComponentFixture<TicketRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
