import { TestBed } from '@angular/core/testing';

import { TurnoOdontologoService } from './turnoodontologo.service';

describe('TurnoOdontologoService', () => {
  let service: TurnoOdontologoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoOdontologoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
