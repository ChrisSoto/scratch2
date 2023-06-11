import { Injectable, inject, signal } from '@angular/core';
import { ActiveChurchSlideshowService } from './active-church-slideshow.service';
import { ChurchHymn, ChurchHymnLyrics, ChurchSlide, ChurchSlideshow } from '../interface/ChurchSlideshow.interface';
import { Unsubscribable } from 'rxjs';

interface SlidesData {
  active: number;
  total: number;
}

interface SlidesControlData {
  slides: SlidesData;
  subSlides: SlidesData;
}

@Injectable()
export class SlideshowControlsService {
  fullscreen = signal(false);

  private active = inject(ActiveChurchSlideshowService);
  private slideshow$!: Unsubscribable;
  private data: SlidesControlData = {
    slides: {
      active: 0,
      total: 0,
    },
    subSlides: {
      active: 0,
      total: 0,
    },
  };

  setup() {
    this.slideshow$ = this.active.slideshow$
      .subscribe((slideshow) => {
        if (slideshow) this.updateControlData();
      });
  }

  keyDown(event: KeyboardEvent) {
    if (event.code === 'KeyF') this.toggleFullscreen();
    if (event.code === 'ArrowRight') this.nextIndex();
    if (event.code === 'ArrowLeft') this.prevIndex();
  }

  toggleFullscreen() {
    this.fullscreen() ? this.fullscreen.set(false) : this.fullscreen.set(true);
  }

  nextIndex() {
    if (!this.hasSlides()) return;
    if (this.hasSubSlides()) {
      // progress through subslides until they're end
      this.nextSlide(!this.atEndOfSubSlides());
    } else {
      this.nextSlide();
    }
  }

  prevIndex() {
    if (!this.hasSlides()) return;
    if (this.hasSubSlides()) {
      // move back through subslides until they're start
      this.prevSlide(!this.atStartOfSubSlides());
    } else {
      this.prevSlide();
    }
  }

  private updateControlData() {
    const slideshow = this.active.slideshow$.value as ChurchSlideshow;
    this.data.slides.active = slideshow.activeSlide;
    this.data.slides.total = slideshow.slides.length;
    const activeSlide = slideshow.slides[slideshow.activeSlide];
    if (activeSlide.type === 'HYMN') {
      this.data.subSlides.active = slideshow.activeSubSlide;
      this.data.subSlides.total = Object.keys(activeSlide.data.lyrics).length;
    }
  }

  private nextSlide(sub?: boolean) {
    if (sub) {
      this.active.nextSlide(sub);
    } else {
      if (!this.atEndOfSlides()) {
        this.active.nextSlide();
      }
    }

  }

  private prevSlide(sub?: boolean) {
    if (sub) {
      this.active.prevSlide(sub);
    } else {
      if (!this.atStartOfSlides()) {
        this.active.prevSlide();
      }
    }
  }

  private hasSlides(): boolean {
    return this.data.slides.total > 0;
  }

  private hasSubSlides(): boolean {
    return this.data.subSlides.total > 0;
  }

  private atStartOfSlides() {
    return this.data.slides.active === 0;
  }

  private atEndOfSlides() {
    return this.data.slides.active === this.data.slides.total - 1;
  }

  private atStartOfSubSlides(): boolean {
    return this.data.subSlides.active === 0;
  }

  private atEndOfSubSlides(): boolean {
    return this.data.subSlides.active === this.data.subSlides.total - 1;
  }


  reset() {
    this.slideshow$.unsubscribe();
  }
}
