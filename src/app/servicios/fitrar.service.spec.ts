import { TestBed } from '@angular/core/testing';

import { FitrarService } from './fitrar.service';

describe('FitrarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FitrarService = TestBed.get(FitrarService);
    expect(service).toBeTruthy();
  });
});
