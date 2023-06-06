import { Injectable, inject } from '@angular/core';
import { ChurchSlideshowService } from './church-slideshow.service';
import { BehaviorSubject } from 'rxjs';
import { ChurchSlide, ChurchSlideType, ChurchSlideshow } from '../interface/ChurchSlideshow.interface';
import { ChurchSlideService } from './church-slide.service';

// viewing / editing active slideshow

@Injectable()
export class ActiveChurchSlideshowService {

  private slideshowService = inject(ChurchSlideshowService);
  private slideService = inject(ChurchSlideService);
  slideshow$: BehaviorSubject<ChurchSlideshow | null> = new BehaviorSubject<ChurchSlideshow | null>(null);
  title$: BehaviorSubject<string> = new BehaviorSubject('');
  slides$: BehaviorSubject<ChurchSlide[]> = new BehaviorSubject<ChurchSlide[]>([]);

  setSlideshow(slideshow: ChurchSlideshow) {
    this.slideshow$.next(slideshow);
    this.title$.next(slideshow.title);
    this.slides$.next(slideshow.slides);
  }

  addSlide(type: ChurchSlideType) {
    const slideshow = this.slideshow$.value as ChurchSlideshow;
    slideshow.slides.push(this.slideService.addEmptySlide(type));
    this.updateLocalSlides(slideshow.slides);
  }

  updateLocalSlides(slides: ChurchSlide[]) {
    this.slides$.next(slides);
  }

  clear() {
    this.slideshow$.next(null);
    this.title$.next('');
    this.slides$.next([]);
  }

}
