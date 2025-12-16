import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { CartServices } from '../../../services/cart-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [NgFor],
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  constructor(private cartServices: CartServices, private router: Router) { }

  @Input() title!: string;
  @Input() imageUrl: string = '';
  @Input() price!: number;
  @Input() rating: number = 0;
  @Input() products: any = {};

  user = localStorage.getItem('user');

  @Output() addToCartEvent = new EventEmitter<number>(); // emit quantity

  cartCount = 0;

  product: any = { user_id: '', name: '', product_id: '', quantity: 0 }


  addToCart() {
    if (!this.user) {
      Swal.fire({
        theme: 'auto',
        icon: 'warning',
        title: 'Please login first!',
        text: "You need to sign in to add items to your cart"
      });
      return;
    }

    const userRaw = JSON.parse(this.user);

    this.cartServices.addToCart({
      user_id: userRaw.id,
      product_id: this.products.id,
      quantity: 1,
    }).subscribe({
      next: (res) => {
        Swal.fire({
          theme: 'auto',
          icon: 'success',
          title: 'Added to cart!',
          text: "Item has been added to your cart"
        }).then((willdirect: any) => {
          if (willdirect.isConfirmed) {
            this.router.navigate(['/auth/sign-in']);
          }
        })
      }
    });

    this.addToCartEvent.emit(1);
  }
}
