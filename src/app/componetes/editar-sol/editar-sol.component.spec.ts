import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolComponent } from './editar-sol.component';

describe('EditarSolComponent', () => {
  let component: EditarSolComponent;
  let fixture: ComponentFixture<EditarSolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
