import { TestBed } from '@angular/core/testing';

import { DistribucionAdministrativaService } from './distribucion-administrativa.service';

describe('DistribucionAdministrativaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistribucionAdministrativaService = TestBed.get(DistribucionAdministrativaService);
    expect(service).toBeTruthy();
  });
});
