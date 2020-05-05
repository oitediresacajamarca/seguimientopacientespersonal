import { TestBed } from '@angular/core/testing';

import { FuatService } from './fuat.service';

describe('FuatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuatService = TestBed.get(FuatService);
    expect(service).toBeTruthy();
  });
});
