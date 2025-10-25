import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoPacienteComponent } from './turnopaciente.component';

describe('Turno', () => {
  let component: TurnoPacienteComponent;
  let fixture: ComponentFixture<TurnoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
