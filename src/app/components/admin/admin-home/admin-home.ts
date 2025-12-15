import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  imports: [Dashboard],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome {
  constructor(private readonly title: Title){
    this.title.setTitle("Admin Dashboard - StyleHub")
  }
}
