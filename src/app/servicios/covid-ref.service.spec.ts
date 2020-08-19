import { TestBed } from '@angular/core/testing';

import { CovidRefService } from './covid-ref.service';

describe('CovidRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidRefService = TestBed.get(CovidRefService);
    expect(service).toBeTruthy();
  });
});
