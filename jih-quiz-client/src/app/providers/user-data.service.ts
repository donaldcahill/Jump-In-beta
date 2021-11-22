import { User } from './../../dto/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private user: User;
  constructor() { }
  get(): User {
    return this.user;
  }
  set(user: User): void {
    this.user = user;
  }
}
