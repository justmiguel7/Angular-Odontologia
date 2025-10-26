import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plandental } from './plandental';

describe('Plandental', () => {
  let component: Plandental;
  let fixture: ComponentFixture<Plandental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plandental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Plandental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
