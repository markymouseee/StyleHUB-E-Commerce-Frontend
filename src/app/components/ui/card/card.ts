import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}
