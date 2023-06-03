import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  readonly show = signal(false);

  constructor() { }

  hideToolbar() {
    this.show.set(false);
  }

  showToolbar() {
    this.show.set(true);
  }

}
