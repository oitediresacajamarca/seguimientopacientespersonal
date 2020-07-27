import { TestBed } from '@angular/core/testing';

import { DistribucionGeograficaService } from './distribucion-geografica.service';

describe('DistribucionGeograficaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistribucionGeograficaService = TestBed.get(DistribucionGeograficaService);
    expect(service).toBeTruthy();
  });
});
