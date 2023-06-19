import { Injectable, inject } from '@angular/core';
import { ChurchSlideshowService } from './church-slideshow.service';
import { ChurchSlide, ChurchSlideType } from '../interface/ChurchSlideshow.interface';

@Injectable()
export class ChurchSlideService {

  slideshowService = inject(ChurchSlideshowService);

  constructor() { }

  addEmptySlide(type: ChurchSlideType): ChurchSlide {
    return {
      type: type,
      data: false
    };
  }
}
