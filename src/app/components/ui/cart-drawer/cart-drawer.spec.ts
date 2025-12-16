import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDrawerComponent } from './cart-drawer';

describe('CartDrawer', () => {
  let component: CartDrawerComponent;
  let fixture: ComponentFixture<CartDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
