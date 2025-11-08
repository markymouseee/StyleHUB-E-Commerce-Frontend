import { NgFor } from '@angular/common';
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
      title: 'Nmoder Casual Dresses for Women ',
      imageUrl: 'https://m.media-amazon.com/images/I/61YC42LACYL._AC_UY1000_.jpg',
      price: 29.99,
      rating: 4.5
    },
    {
      title: 'Casual Jacket',
      imageUrl: 'https://m.media-amazon.com/images/I/61vB24KUtrL._AC_UY1000_.jpg',
      price: 49.99,
      rating: 4.0
    },
    {
      title: "Men's Button Down Shirts",
      imageUrl: 'https://m.media-amazon.com/images/I/31d+R37-JIL.jpg',
      price: 25.99,
      rating: 4.2
    },
    {
      title: "Mens Tuxedo",
      imageUrl: 'https://m.media-amazon.com/images/I/51PzVU-id0L._AC_SX569_.jpg',
      price: 76.49,
      rating: 3
    },
    {
      title: "COOFANDY Men's Floral Tuxedo",
      imageUrl: 'https://m.media-amazon.com/images/I/81-SidgvvtL._AC_SY550_.jpg',
      price: 66.49,
      rating: 5
    },
    {
      title: "FaroLy Women's Casual 2 Piece Outfits",
      imageUrl: 'https://m.media-amazon.com/images/I/51a8d4MKzzL._AC_SX569_.jpg',
      price: 44.14,
      rating: 4.5
    },
    {
      title: "OUTFIT Men's Cotton",
      imageUrl: "https://m.media-amazon.com/images/I/51-O-VCzDfL.jpg",
      price: 39.99,
      rating: 4.5
    },
    {
      title: "NQyIOS Mens Spring and Summer",
      imageUrl: "https://m.media-amazon.com/images/I/71hisBxSamL._AC_SX679_.jpg",
      price: 99.99,
      rating: 5
    }
  ];
}

