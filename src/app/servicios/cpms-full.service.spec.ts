import { TestBed } from '@angular/core/testing';

import { CpmsFullService } from './cpms-full.service';

describe('CpmsFullService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpmsFullService = TestBed.get(CpmsFullService);
    expect(service).toBeTruthy();
  });
});
