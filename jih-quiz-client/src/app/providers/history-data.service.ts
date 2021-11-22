import { Injectable } from '@angular/core';
import { History } from '../../dto/History';

@Injectable({
  providedIn: 'root',
})
export class HistoryDataService {
  history: History;
  constructor() {}
  get() {
    return this.history;
  }
  set(history: History) {
    this.history = history;
  }
}
