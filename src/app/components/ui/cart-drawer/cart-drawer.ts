import { Component, OnInit } from '@angular/core';
import { CartServices } from '../../../services/cart-services';
import { NgFor, NgIf } from '@angular/common';
import { LucideAngularModule, X, Trash } from 'lucide-angular';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [NgFor, NgIf, LucideAngularModule],
  templateUrl: './cart-drawer.html',
  styleUrls: ['./cart-drawer.css']
})
export class CartDrawerComponent implements OnInit {
  isOpen = false;
  cartItems: any[] = [];

  readonly Exit = X;
  readonly Trash = Trash;
  constructor(private cartServices: CartServices) {

  }

  fetchCartItems() {
    this.cartServices.fetchCart().subscribe({
      next: (data: any) => {
        this.cartItems = data.cart_items.map((item: any) => ({
          ...item.product,
          quantity: item.quantity
        }));
        console.log(this.cartItems);
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.fetchCartItems();
  }

  increment(product: any) {
    const newQuantity = (product.quantity ?? 1) + 1;

    this.cartServices.updateQuantity(product.id, newQuantity).subscribe({
      next: () => {
        product.quantity = newQuantity;
      },
      error: (err) => console.error('Increment error', err)
    });
  }

  decrement(product: any) {
    const newQuantity = (product.quantity ?? 1) - 1;

    if (newQuantity < 1) {
      // Remove item if quantity goes below 1
      this.remove(product);
      return;
    }

    this.cartServices.updateQuantity(product.id, newQuantity).subscribe({
      next: () => {
        // Update quantity locally
        product.quantity = newQuantity;
      },
      error: (err) => console.error('Decrement error', err)
    });
  }

  remove(product: any) {
    this.cartServices.removeItem(product.id).subscribe({
      next: (res) => {
        console.log('Remove response', res);
        // Remove from local cart
        this.cartItems = this.cartItems.filter(p => p.id !== product.id);
      },
      error: (err) => console.error('Remove error', err)
    });
  }



  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  ngOnInit(): void {
    this.fetchCartItems();
  }
}
