import { TestBed } from '@angular/core/testing';

import { MEXCAPIService } from './mexcapi.service';

describe('MEXCAPIService', () => {
  let service: MEXCAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MEXCAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
