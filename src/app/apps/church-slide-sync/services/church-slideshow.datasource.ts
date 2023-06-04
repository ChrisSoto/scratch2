import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChurchSlideshow } from '../interface/ChurchSlideshow.interface';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { ChurchSlideshowService } from './church-slideshow.service';
import { GeneralQuery } from 'src/app/shared/services/sort-to-query-constraints.service';

@Injectable()
export class ChurchSlideshowDataSource extends DataSource<ChurchSlideshow> {

  churchSlideshows$ = new BehaviorSubject<ChurchSlideshow[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  nextPage$ = new BehaviorSubject<QueryDocumentSnapshot | null>(null);
  count$ = new BehaviorSubject<number>(0);

  churchService = inject(ChurchSlideshowService);
  paginate = inject(PaginationService);

  constructor() {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<ChurchSlideshow[]> {
    return this.churchSlideshows$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.churchSlideshows$.complete();
  }

  load(sort?: GeneralQuery[]) {
    this.isLoading$.next(true);
    this.churchService.list$(sort)
      .subscribe((systems: ChurchSlideshow[]) => {
        this.churchSlideshows$.next(systems);
        this.isLoading$.next(false);
      });
  }

  loadPaginated(sort?: GeneralQuery[], pageEvent?: PageEvent) {
    if (!sort) sort = [{ name: 'orderBy', field: 'created', direction: 'desc' }];
    if (pageEvent) {
      const start = this.paginate.start(pageEvent);
      if (start) sort.push(start);
    }
    this.isLoading$.next(true);
    this.churchService.listPaginated$(sort)
      .subscribe((res) => {
        this.churchSlideshows$.next(res.data);
        this.paginate.savePage(res.next, pageEvent);
        this.isLoading$.next(false);
        this.count$.next(res.count);
      });
  }

}
