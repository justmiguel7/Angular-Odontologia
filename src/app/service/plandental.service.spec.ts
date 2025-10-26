/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlandentalService } from './plandental.service';

describe('Service: Plandental', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlandentalService]
    });
  });

  it('should ...', inject([PlandentalService], (service: PlandentalService) => {
    expect(service).toBeTruthy();
  }));
});
