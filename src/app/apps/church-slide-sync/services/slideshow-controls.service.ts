import { Injectable, inject, signal } from '@angular/core';
import { ActiveChurchSlideshowService } from './active-church-slideshow.service';

@Injectable()
export class SlideshowControlsService {

  active = inject(ActiveChurchSlideshowService);
  fullscreen = signal(false);

  setup() {
    // how many slides total
  }

  // slide change
  update() {
    // are there subslides
    // how many subslides
  }

  keyDown(event: KeyboardEvent) {
    if (event.code === 'KeyF') this.toggleFullscreen();
    // if (event.code === 'KeyB') this.black();
    if (event.code === 'ArrowRight') this.nextIndex();
    if (event.code === 'ArrowLeft') this.prevIndex();
  }

  toggleFullscreen() {
    this.fullscreen() ? this.fullscreen.set(false) : this.fullscreen.set(true);
  }

  nextIndex() {
    // if subSlidesExist()
    //// if endOfSubSlides()
    ////// nextSlide()
    //// else
    ////// nextSubslide()
    // else
    //// nextSlide()
  }

  prevIndex() {
    // if subSlidesExist()
    //// if startOfSubSlides()
    ////// prevSlide()
    //// else
    ////// prevSubSlide()
    // else
    //// prevSlide()
  }

  reset() {

  }
}
