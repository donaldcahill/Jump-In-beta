import { User } from './../../dto/User';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ContratsService {
  private points: number;
  constructor() { }
  get(): number {
    return this.points;
  }
  set(points: number): void {
    this.points = points;
  }
}
