import { TestBed } from '@angular/core/testing';

import { DetalleDentalService } from './detalle-dental.service';

describe('DetalleDentalService', () => {
  let service: DetalleDentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleDentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
