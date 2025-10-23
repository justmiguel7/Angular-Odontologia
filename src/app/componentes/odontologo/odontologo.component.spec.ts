import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontologoComponent } from './odontologo.component';

describe('OdontologoComponent', () => {
  let component: OdontologoComponent;
  let fixture: ComponentFixture<OdontologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdontologoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
