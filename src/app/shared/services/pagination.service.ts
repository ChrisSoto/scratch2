import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { GeneralQuery } from './sort-to-query-constraints.service';

export interface SavedPages<T> {
  [page: number]: QueryDocumentSnapshot<T>;
}

@Injectable()
export class PaginationService {

  savedPages$ = new BehaviorSubject<SavedPages<any>>({});
  nextPage$ = new BehaviorSubject<QueryDocumentSnapshot | null>(null);

  constructor() { }

  start(pageEvent: PageEvent) {
    if (pageEvent && pageEvent.pageIndex === 0) return false;

    let start!: GeneralQuery;
    const saved = this.savedPages$.value;

    // not sure about this...
    if (pageEvent.previousPageIndex) {
      start = pageEvent.pageIndex > pageEvent.previousPageIndex ?
        { name: 'startAfter', value: saved[pageEvent.previousPageIndex] } :
        { name: 'startAfter', value: saved[pageEvent.pageIndex - 1] };
    } else {
      start = { name: 'startAfter', value: saved[pageEvent.pageIndex - 1] };
    }

    return start ? start : false;
  }

  savePage(doc: QueryDocumentSnapshot, pageEvent?: PageEvent) {
    this.nextPage$.next(doc);
    let pages = this.savedPages$.value;
    if (!pageEvent) {
      pages[0] = doc;
    } else {
      if (!pages[pageEvent.pageIndex]) {
        pages[pageEvent.pageIndex] = doc;
      }
    }
    this.savedPages$.next(pages);
  }
}
