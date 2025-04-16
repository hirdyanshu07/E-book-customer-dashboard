import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


interface Book {
  id: string;
  title: string;
  category: string;
  purchased: boolean;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,  RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})



export class DashboardComponent {
  userEmail = '';
  books: Book[] = [];

  constructor(private auth: AuthService) {
    this.userEmail = this.auth.getCurrentUser() || '';
    this.books = [
      { id: 'b1', title: 'The Angular Journey', category: 'Programming', purchased: true },
      { id: 'b2', title: 'Learning TypeScript', category: 'Programming', purchased: false },
      { id: 'b3', title: 'Design Systems', category: 'UX/UI', purchased: false },
    ];
  }

  purchaseBook(book: Book) {
    book.purchased = true;
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }}
