import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHistorial } from './agregar-historial';

describe('AgregarHistorial', () => {
  let component: AgregarHistorial;
  let fixture: ComponentFixture<AgregarHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHistorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
