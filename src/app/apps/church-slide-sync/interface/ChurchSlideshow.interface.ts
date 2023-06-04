
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

import { Meta } from "src/app/shared/interface/meta.model";

export interface ChurchSlideshow extends Meta {
  title: string;
  pastor: string;
  date: Date;
  slides: ChurchSlide[]
}

export interface ChurchHymn {
  number: number;
  title: string;
  publication: string; // remove
  tune: string;
  key: string;
  lyrics: { [section: string]: string[] };
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

export interface ChurchSlideImage extends Meta {
  url: string;
  name: string;
}