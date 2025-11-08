import { Component } from '@angular/core';
import { LucideAngularModule, Moon, Search, ShoppingBag, User } from "lucide-angular";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly Search = Search;
  readonly User = User;
  readonly Moon = Moon;
  readonly ShoppingBag = ShoppingBag;
}
