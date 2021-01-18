import { TestBed } from '@angular/core/testing';

import { MovimentsService } from './moviments.service';

describe('MovimentsService', () => {
  let service: MovimentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
