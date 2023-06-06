import { Injectable, signal } from '@angular/core';

@Injectable()
export class SlideshowControlsService {

  fullscreen = signal(false);

  keyDown(event: KeyboardEvent) {
    if (event.code === 'KeyF') this.toggleFullscreen();
  }

  toggleFullscreen() {
    this.fullscreen() ? this.fullscreen.set(false) : this.fullscreen.set(true);
  }
}
