import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChurchHymn, ChurchHymnLyrics, ChurchSlideshow } from '../interface/ChurchSlideshow.interface';
import { ActiveChurchSlideshowService } from './active-church-slideshow.service';

@Injectable()
export class ActiveHymnService {

  slideshow$: BehaviorSubject<ChurchSlideshow | null> = inject(ActiveChurchSlideshowService).slideshow$;
  verse$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  refrain$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  hymn$: BehaviorSubject<ChurchHymn | null> = new BehaviorSubject<ChurchHymn | null>(null);
  order$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  update() {
    this.slideshow$.asObservable()
      .subscribe((slideshow) => {
        if (!slideshow) return;
        const slides = slideshow.slides;
        this.order$.next(slideshow.activeSubSlide + 1);
        const slide = slides[slideshow.activeSlide];
        let hymn: ChurchHymn;
        if (slide && slide.type === 'HYMN') {
          hymn = slide.data as ChurchHymn;
          this.hymn$.next(hymn);
          const key = 's' + (slideshow.activeSubSlide + 1);
          const verse = hymn.lyrics[key];
          this.verse$.next(verse);
          if ('refrain' in hymn && hymn.refrain) {
            this.refrain$.next(hymn.refrain);
          }
        }
      });
  }
}
