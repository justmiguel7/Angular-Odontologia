import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quienessomos } from './quienessomos';

describe('Quienessomos', () => {
  let component: Quienessomos;
  let fixture: ComponentFixture<Quienessomos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quienessomos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quienessomos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
