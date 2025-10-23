import { TestBed } from '@angular/core/testing';

import { DetalleFacturaService } from './detallefactura.service';

describe('PacienteService', () => {
  let service: DetalleFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
