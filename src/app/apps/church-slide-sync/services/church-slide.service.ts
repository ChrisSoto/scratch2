import { Injectable, inject } from '@angular/core';
import { ChurchSlideshowService } from './church-slideshow.service';
import { ChurchSlideType } from '../interface/ChurchSlideshow.interface';

@Injectable()
export class ChurchSlideService {

  slideshowService = inject(ChurchSlideshowService);

  constructor() { }

  addEmptySlide(type: ChurchSlideType) {
    return {
      type: type,
      data: {}
    };
  }
}
