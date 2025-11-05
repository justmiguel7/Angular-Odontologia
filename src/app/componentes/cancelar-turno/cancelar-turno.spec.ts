import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarTurno } from './cancelar-turno';

describe('CancelarTurno', () => {
  let component: CancelarTurno;
  let fixture: ComponentFixture<CancelarTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
