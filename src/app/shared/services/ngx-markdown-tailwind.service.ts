import { Injectable, inject } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Injectable({
  providedIn: 'root'
})
export class NgxMarkdownTailwindService {
  // moving to service at some point
  mkRender = inject(MarkdownService);

  constructor() {
    this.render();
  }

  render() {
    this.mkRender.renderer.heading = (text, level) => {
      return '<h'+ level + ' class="' + this.setHeaderClasses(level) + '">' + text + '</h' + level + '>';
    }

    this.mkRender.renderer.paragraph = (text) => {
      return '<p class="text-base leading-relaxed tracking-wide font-normal text-justify mb-4">' + text + '</p>';
    }

    this.mkRender.renderer.image = (href, desc, altText) => {
      const altData = this.parseAltText(altText);
      return  '<div class="' + this.setImgClasses(altData.align) +' pb-3">' +
                '<img class="border-white border-solid border-4 mat-elevation-z1  w-full" src="' + href + '" alt="' + altData.text  + '">' +
                '<div class="text-sm leading-tight text-center text-slate-600 pt-2">' + desc  + '</div>' +
              '</div>';
    }

    this.mkRender.renderer.listitem = (text, task, checked) => {
      return '<li>' + text  + '</li>';
    }

    this.mkRender.renderer.list = (body, order, start) => {
      if (order) {
        return '<ol class="list-outside list-decimal mb-4 pl-8">' + body + '</ol>';
      } else {
        return '<ul class="list-outside list-disc mb-4 pl-8">' + body + '</ul>';
      }
    }
  }

  setImgClasses(align: string): string {
    switch (align) {
      case 'left':
        return 'float-left w-full sm:w-3/4 md:w-1/2 pr-0 sm:pr-4';
      case 'right':
        return 'float-right w-full sm:w-3/4 md:w-1/2 pr-0 sm:pl-4';
      case 'left-small':
        return 'float-left w-1/2 sm:w-1/4 pr-0 pr-4';
      case 'right-small':
        return 'float-right w-1/2 sm:w-1/4 pr-0 pl-4';
      case 'center':
        return 'mx-auto float-none w-full sm:w-1/2';
      case 'center-full':
        return 'mx-auto float-none w-full sm:w-5/6 md:w-11/12 '
      default:
        return 'float-none';
    }
  }

  parseAltText(text: string) {
    // left:: | center:: | right:: | center-full:: | left-small:: | right-small::
    const data = text.split('::');
    return {
      align: data[0],
      text: data[1],
    }
  }

  setHeaderClasses(level: number): string {
    let headerClass = '';
    switch (level) {
      case 1:
        headerClass = 'text-4xl font-bold tracking-wide text-slate-800 pb-4';
        break;

      case 2:
        headerClass = 'text-3xl font-light tracking-wide text-slate-950 pb-4';
        break;

      case 3:
        headerClass = 'text-2xl font-bold tracking-wide text-slate-700 pb-2';
        break;

      case 4:
        headerClass = 'text-2xl font-light tracking-wide text-slate-900 pb-2';
        break;

      case 5:
        headerClass = 'text-xl font-bold tracking-wide text-slate-800 pb-1';
        break;

      case 6:
        headerClass = 'text-lg font-light italic tracking-wide text-slate-950 pb-1';
        break;
    }
    return headerClass;
  }
}
