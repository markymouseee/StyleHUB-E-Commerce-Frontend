import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { CommonModule, NgIf } from '@angular/common';
import { OrderServices } from '../../../services/order-services';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, Dashboard, NgIf],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders implements OnInit {

  orders: any[] = [];

  // Pagination state
  currentPage = 1;
  lastPage = 1;
  links: any[] = [];
  isLoading = false;

  constructor(private orderServices: OrderServices) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(page: number = 1): void {
    this.isLoading = true;

    this.orderServices.getOrder(page).subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.links = res.links;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  changePage(page: number | null): void {
    if (!page || page === this.currentPage) return;
    this.getOrders(page);
  }

  approveOrder(orderId: number): void {
    this.orderServices.approveOrder({
      id: orderId
    }).subscribe({
      next: () => this.getOrders(this.currentPage),
      error: (err) => console.error(err)
    });
  }


  declineOrder(orderId: number): void {
    this.orderServices.declineOrder(orderId).subscribe({
      next: () => this.getOrders(this.currentPage)
    });
  }
}
