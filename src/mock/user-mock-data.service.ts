import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMockDataService {
  private users: any[] = [];

  getUsers(): any[] {
    return this.users;
  }

  addUser(user: any): void {
    this.users.push(user);
  }

  userExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  constructor() { }
}
