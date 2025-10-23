import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admincards } from './admincards';

describe('Admincards', () => {
  let component: Admincards;
  let fixture: ComponentFixture<Admincards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admincards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admincards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
