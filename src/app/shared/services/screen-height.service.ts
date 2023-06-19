import { Injectable, signal } from '@angular/core';

// checks to see if the page should be treated as full-height or scroll

@Injectable({
  providedIn: 'root'
})
export class ScreenHeightService {

  fullClass = "h-full"; // tailwind

  readonly fullScreen = signal('');

  constructor() { }

  setFullScreen(value: boolean) {
    this.fullScreen.update(() => {
      return value ? this.fullClass : '';
    })
  }

}
