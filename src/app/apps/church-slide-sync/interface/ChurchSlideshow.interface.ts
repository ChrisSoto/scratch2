
// export interface ChurchService extends Meta {
//   prelude: string;
//   hymn1: string;
//   responsive?: string;
//   confession?: string;
//   pardon?: string;
//   hymn2: string;
//   hymn3: string;
//   doxology: string;
//   sermen?: string;
//   hymn4: string;
//   exit?: string;
// }

import { Timestamp } from "@angular/fire/firestore";
import { Meta } from "src/app/shared/interface/meta.model";

export interface ChurchSlideShowBasic {
  title: string;
  pastor: string;
  date: Timestamp;
}

export interface ChurchSlideShowDto {
  title: string;
  pastor: string;
  date: Timestamp | Date;
  slides: ChurchSlide[];
  activeSlide: number;
  activeSubSlide: number;  
}

export interface ChurchSlideshow extends Meta {
  title: string;
  pastor: string;
  date: Timestamp | Date;
  slides: ChurchSlide[];
  activeSlide: number;
  activeSubSlide: number;
}

export interface ChurchHymnLyrics {
  [section: string]: string[]
}

export interface ChurchHymn {
  number: number;
  title: string;
  publication: string; // remove
  tune: string;
  key: string;
  lyrics: ChurchHymnLyrics;
  source?: string;
  composer?: string;
  author?: string;
  scripture?: string;
  meter?: string;
  refrain?: string[];
}

export type ChurchSlideType = 'HYMN' | 'TEXT' | 'IMAGE' | 'EMPTY';

export interface ChurchSlide {
  data?: any;
  type: ChurchSlideType;
}

export interface EmptySlide extends Meta {
  bgColor: string;
}

export interface ImageUrl {
  url: string;
}

export interface ChurchSlideImage extends Meta {
  url: string;
  name: string;
}