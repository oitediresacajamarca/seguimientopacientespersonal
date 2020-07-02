import { TestBed } from '@angular/core/testing';

import { IpressService } from './ipress.service';

describe('IpressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpressService = TestBed.get(IpressService);
    expect(service).toBeTruthy();
  });
});
