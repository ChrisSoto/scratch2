import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { PPart } from '../model/models.interface';
import { GeneralQuery } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SystemPartService } from './system-part.service';

@Injectable()
export class PartDataSource extends DataSource<PPart> {

  parts$ = new BehaviorSubject<PPart[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  nextPage$ = new BehaviorSubject<QueryDocumentSnapshot | null>(null);
  count$ = new BehaviorSubject<number>(0);

  constructor(
    private partService: SystemPartService,
    private paginate: PaginationService,
  ) {
    super();
  }

  connect(_collectionViewer: CollectionViewer): Observable<PPart[]> {
    return this.parts$.asObservable();
  }

  disconnect(_collectionViewer: CollectionViewer): void {
    this.parts$.complete();
  }

  load(sort?: GeneralQuery[]) {
    this.isLoading$.next(true);
    this.partService.list$(sort)
      .subscribe((parts: PPart[]) => {
        this.parts$.next(parts);
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
    this.partService.listPaginated$(sort)
      .pipe(
        take(1)
      )
      .subscribe((res) => {
        this.parts$.next(res.data);
        this.paginate.savePage(res.next, pageEvent);
        this.isLoading$.next(false);
        this.count$.next(res.count);
      });
  }

}
