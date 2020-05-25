import { TestBed } from '@angular/core/testing';

import { FuatServicioService } from './fuat-servicio.service';

describe('FuatServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuatServicioService = TestBed.get(FuatServicioService);
    expect(service).toBeTruthy();
  });
});
