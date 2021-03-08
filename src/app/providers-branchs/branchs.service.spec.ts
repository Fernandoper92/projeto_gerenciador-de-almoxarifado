import { TestBed } from '@angular/core/testing';

import { BranchsService } from './branchs.service';

describe('BranchsService', () => {
  let service: BranchsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
