import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar'; // ✅ Import correcto

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent] // ✅ también acá
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent); // ✅ y acá
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
