import { Component } from '@angular/core';
import { LucideAngularModule, Moon, Search, ShoppingBag, User } from "lucide-angular";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly Search = Search;
  readonly User = User;
  readonly Moon = Moon;
  readonly ShoppingBag = ShoppingBag;
}
