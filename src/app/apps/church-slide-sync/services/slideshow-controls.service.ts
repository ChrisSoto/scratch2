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

  disabled = signal(false);

  navControls = signal(false);

  keyDown(event: KeyboardEvent) {
    if (this.disabled()) return;
    if (event.code === 'KeyF') this.toggleFullscreen();
    if (event.code === 'ArrowRight') this.next();
    if (event.code === 'ArrowLeft') this.prev();
  }

  toggleFullscreen() {
    this.fullscreen() ? this.fullscreen.set(false) : this.fullscreen.set(true);
  }

  next() {
    const slideshow = this.active.slideshow$.value as ChurchSlideshow;
    const slide = slideshow?.slides[slideshow.activeSlide];

    // no slides
    if (slideshow.slides.length < 1) return;

    // regular slide
    if (slide.type !== 'HYMN') {

      this.nextSlide(slideshow);

      // hymn slide
    } else {

      // does it have a selected hymn?
      if (!slide.data) {
        this.nextSlide(slideshow);
        return;
      }

      const totalHymnSlides = Object.keys(slide.data.lyrics).length;

      // no hymn slides
      if (totalHymnSlides < 1) {
        this.nextSlide(slideshow)
        return;
      }

      // at end of subslides
      // need to go to next slide
      if (slideshow.activeSubSlide >= totalHymnSlides - 1) {
        this.nextSlide(slideshow)
        return;
      }

      this.nextHymnSlide(slideshow, totalHymnSlides);
    }
  }

  prev() {
    const slideshow = this.active.slideshow$.value as ChurchSlideshow;
    const slide = slideshow?.slides[slideshow.activeSlide];

    // no slides
    if (slideshow.slides.length < 1) return;

    // regular slide
    if (slide.type !== 'HYMN') {

      this.prevSlide(slideshow);

      // hymn slide
    } else {

      // does it have a selected hymn?
      if (!slide.data) {
        this.prevSlide(slideshow);
        return;
      }

      const totalHymnSlides = Object.keys(slide.data.lyrics).length;

      // no hymn slides
      if (totalHymnSlides < 1) {
        this.prevSlide(slideshow)
        return;
      }

      // at start of subslides
      // need to go back a slide
      if (slideshow.activeSubSlide === 0) {
        this.prevSlide(slideshow)
        return;
      }

      this.prevHymnSlide(slideshow);
    }
  }

  private nextSlide(slideshow: ChurchSlideshow) {
    const nextIndex = slideshow.activeSlide + 1;
    if (nextIndex <= (slideshow.slides.length - 1)) this.active.nextSlide();
  }

  private nextHymnSlide(slideshow: ChurchSlideshow, total: number) {
    const nextIndex = slideshow.activeSubSlide + 1;
    if (nextIndex <= total - 1) this.active.nextSlide(true);
  }

  private prevSlide(slideshow: ChurchSlideshow) {
    if (slideshow.activeSlide > 0) this.active.prevSlide();
  }

  private prevHymnSlide(slideshow: ChurchSlideshow) {
    if (slideshow.activeSubSlide > 0) this.active.prevSlide(true);
  }

  reset() {
    this.slideshow$.unsubscribe();
  }
}
