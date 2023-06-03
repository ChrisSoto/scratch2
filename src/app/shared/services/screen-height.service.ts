import { Injectable, signal } from '@angular/core';

// checks to see if the page should be treated as full-height or scroll

@Injectable({
  providedIn: 'root'
})
export class ScreenHeightService {

  readonly full = signal(false);

  constructor() { }

  setFull() {
    this.full.set(true);
  }

  setScroll() {
    this.full.set(false);
  }

}
