import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataParsingService {
  private data: any;
  constructor() { }

  get() {
    return this.data;
  }
  set(data: any) {
    this.data = data;
  }
}
