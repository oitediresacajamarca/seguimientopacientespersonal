import { TestBed } from '@angular/core/testing';

import { AtencionRegService } from './atencion-reg.service';

describe('AtencionRegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtencionRegService = TestBed.get(AtencionRegService);
    expect(service).toBeTruthy();
  });
});
