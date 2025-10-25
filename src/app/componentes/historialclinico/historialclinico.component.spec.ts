import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialclinicoComponent } from './historialclinico.component';

describe('Historialclinico', () => {
  let component: HistorialclinicoComponent;
  let fixture: ComponentFixture<HistorialclinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialclinicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialclinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
