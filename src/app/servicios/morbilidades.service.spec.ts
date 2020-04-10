import { TestBed } from '@angular/core/testing';

import { MorbilidadesService } from './morbilidades.service';

describe('MorbilidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MorbilidadesService = TestBed.get(MorbilidadesService);
    expect(service).toBeTruthy();
  });
});
