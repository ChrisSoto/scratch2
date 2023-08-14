import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { GeneralQuery } from 'src/app/services/sort-to-query-constraints.service';

export interface SavedPages<T> {
  [page: number]: QueryDocumentSnapshot<T>;
}

@Injectable()
export class PaginationService {

  savedPages$ = new BehaviorSubject<SavedPages<any>>({});
  nextPage$ = new BehaviorSubject<QueryDocumentSnapshot>(null);

  constructor() { }

  start(pageEvent: PageEvent) {
    if (!pageEvent) return false;
    if (pageEvent && pageEvent.pageIndex === 0) return false;

    let start: GeneralQuery = null;
    const saved = this.savedPages$.value;

    start = pageEvent.pageIndex > pageEvent.previousPageIndex ?
      { name: 'startAfter', value: saved[pageEvent.previousPageIndex] } :
      { name: 'startAfter', value: saved[pageEvent.pageIndex - 1] };

    return start ? start : false;
  }

  savePage<T>(doc: QueryDocumentSnapshot<T>, pageEvent: PageEvent) {
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
