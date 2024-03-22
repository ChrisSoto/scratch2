import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChurchHymn, ChurchSlide, ChurchSlideType, ChurchSlideshow } from '../interface/ChurchSlideshow.interface';
import { ChurchSlideService } from './church-slide.service';
import { ChurchSlideshowService } from './church-slideshow.service';

// viewing / editing active slideshow

@Injectable()
export class ActiveChurchSlideshowService {

  private slideService = inject(ChurchSlideService);
  private slideshowService = inject(ChurchSlideshowService);
  slideshow$: BehaviorSubject<ChurchSlideshow | null> = new BehaviorSubject<ChurchSlideshow | null>(null);
  title$: BehaviorSubject<string> = new BehaviorSubject('');
  slides$: BehaviorSubject<ChurchSlide[]> = new BehaviorSubject<ChurchSlide[]>([]);
  slide$: BehaviorSubject<ChurchSlide | null> = new BehaviorSubject<ChurchSlide | null>(null);

  background = signal(false);
  bgColor = signal('bg-black');

  setSlideshow(slideshow: ChurchSlideshow) {
    this.slideshow$.next(slideshow);
    this.title$.next(slideshow.title);
    this.slides$.next(slideshow.slides);
    this.updateSlide(slideshow);
    this.updateBackground();
  }

  updateBackground() {
    const slide = this.slide$.value;
    if (slide) {
      switch (slide.type) {
        case 'HYMN':
          this.bgColor.set('bg-white');
          break;
        case 'EMPTY':
          if (slide.data && 'bgColor' in slide.data) {
            this.bgColor.set(slide.data.bgColor);
          } else {
            this.bgColor.set('bg-black');
          }
          break;
        default:
          this.bgColor.set('bg-black');
          break;
      }
    }
  }

  updateSlide(slideshow: ChurchSlideshow) {
    this.slide$.next(slideshow.slides[slideshow.activeSlide]);
  }

  removeSlide(order: number) {
    let slideshow = this.slideshow$.value as ChurchSlideshow;
    slideshow.slides.splice(order, 1);
    return this.slideshowService.update(slideshow);
  }

  addSlide(type: ChurchSlideType) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    slideshow.slides.push(this.slideService.addEmptySlide(type));
    return this.slideshowService.update(slideshow);
  }

  setSlides() {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    return this.slideshowService.update(slideshow);
  }

  saveHymn(hymn: ChurchHymn, slideIndex: number) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    slideshow.slides[slideIndex].data = hymn;
    return this.slideshowService.update(slideshow);
  }

  saveColor(color: string, slideIndex: number) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    slideshow.slides[slideIndex].data = { bgColor: color };
    return this.slideshowService.update(slideshow);
  }

  saveImage(imageUrl: string, slideIndex: number) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    slideshow.slides[slideIndex].data = { url: imageUrl};
    return this.slideshowService.update(slideshow);
  }

  nextSlide(sub?: boolean) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    if (!sub) {
      slideshow.activeSlide++;
      slideshow.activeSubSlide = 0;
    } else {
      slideshow.activeSubSlide++;
    }
    this.slideshowService.update(slideshow);
  }

  prevSlide(sub?: boolean) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    if (!sub) {
      slideshow.activeSlide--;
      slideshow.activeSubSlide = this.lastSubSlideIndex(slideshow);
    } else {
      slideshow.activeSubSlide--;
    }
    this.slideshowService.update(slideshow);
  }

  private lastSubSlideIndex(slideshow: ChurchSlideshow) {
    const slide = slideshow.slides[slideshow.activeSlide];
    return slide.type === 'HYMN' && slide.data ? Object.keys(slide.data.lyrics).length - 1 : 0;
  }

  clear() {
    this.slideshow$.next(null);
    this.title$.next('');
    this.slide$.next(null);
    this.slides$.next([]);
    this.bgColor.set('bg-black');
  }

}
