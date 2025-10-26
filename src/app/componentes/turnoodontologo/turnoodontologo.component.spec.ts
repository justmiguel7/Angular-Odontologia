import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoOdontologoComponent } from './turnoodontologo.component';

describe('TurnoOdontologo', () => {
  let component: TurnoOdontologoComponent;
  let fixture: ComponentFixture<TurnoOdontologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoOdontologoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoOdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
