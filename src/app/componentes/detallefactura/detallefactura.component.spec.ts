import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallefacturaComponent } from './detallefactura.component';

describe('Detallefactura', () => {
  let component: DetallefacturaComponent;
  let fixture: ComponentFixture<DetallefacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallefacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallefacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
