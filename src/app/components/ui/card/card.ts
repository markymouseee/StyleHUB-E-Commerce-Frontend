import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  imports: [NgFor],
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  @Input() title!: string;
  @Input() imageUrl: string = '';
  @Input() price!: number;
  @Input() rating: number = 0;

  user = localStorage.getItem('user');

  @Output() addToCartEvent = new EventEmitter<number>(); // emit quantity

  cartCount = 0;

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

    this.addToCartEvent.emit(1); // emit 1 item added
  }
}
