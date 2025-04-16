
import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'ebook_users';
  private readonly SESSION_KEY = 'ebook_session';

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  signup(email: string, password: string): boolean {
    const users = this.getUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) return false;
    users.push({ email, password });
    this.saveUsers(users);
    this.setSession(email);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return false;
    this.setSession(email);
    return true;
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  private setSession(email: string) {
    localStorage.setItem(this.SESSION_KEY, email);
  }
}
