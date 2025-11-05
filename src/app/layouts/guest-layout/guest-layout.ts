import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-guest-layout',
  imports: [Header, Footer],
  templateUrl: './guest-layout.html',
  styleUrl: './guest-layout.css'
})
export class GuestLayout {

}
