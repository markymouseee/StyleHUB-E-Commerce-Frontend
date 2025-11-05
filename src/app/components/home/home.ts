import { Component } from '@angular/core';
import { GuestLayout } from '../../layouts/guest-layout/guest-layout';
import { Card } from '../ui/card/card';

@Component({
  selector: 'app-home',
  imports: [GuestLayout, Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
   cards = [
    {
      title: 'School Shoes',
      imageUrl: 'https://m.media-amazon.com/images/I/61YC42LACYL._AC_UY1000_.jpg',
      price: 29.99,
      rating: 4.5
    },
    {
      title: 'Casual Jacket',
      imageUrl: 'https://m.media-amazon.com/images/I/712cbk6hBcL._AC_UY1000_.jpg',
      price: 49.99,
      rating: 4.0
    }
  ];
}

