import { TestBed } from '@angular/core/testing';

import { CarteraServiciosService } from './cartera-servicios.service';

describe('CarteraServiciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarteraServiciosService = TestBed.get(CarteraServiciosService);
    expect(service).toBeTruthy();
  });
});
