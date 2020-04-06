import { TestBed } from '@angular/core/testing';

import { DistritosService } from './distritos.service';

describe('DistritosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistritosService = TestBed.get(DistritosService);
    expect(service).toBeTruthy();
  });
});
