import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarTurnoRecepcionistaComponent } from './confirmar-turno-recepcionista.component';

describe('ConfirmarTurnoRecepcionista', () => {
  let component: ConfirmarTurnoRecepcionistaComponent;
  let fixture: ComponentFixture<ConfirmarTurnoRecepcionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarTurnoRecepcionistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarTurnoRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
