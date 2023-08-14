import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { PSystem } from '../model/models.interface';
import { SystemService } from './system.service';
import { GeneralQuery } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Injectable()
export class SystemDataSource extends DataSource<PSystem> {

  systems$ = new BehaviorSubject<PSystem[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  nextPage$ = new BehaviorSubject<QueryDocumentSnapshot | null>(null);
  count$ = new BehaviorSubject<number>(0);

  constructor(
    private systemService: SystemService,
    private paginate: PaginationService,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<PSystem[]> {
    return this.systems$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.systems$.complete();
  }

  load(sort?: GeneralQuery[]) {
    this.isLoading$.next(true);
    this.systemService.list$(sort)
      .subscribe((systems: PSystem[]) => {
        this.systems$.next(systems);
        this.isLoading$.next(false);
      });
  }

  loadPaginated(sort?: GeneralQuery[], pageEvent?: PageEvent) {
    console.log('load');
    if (!sort) sort = [{ name: 'orderBy', field: 'created', direction: 'desc' }];
    if (pageEvent) {
      const start = this.paginate.start(pageEvent);
      if (start) sort.push(start);
    }

    this.isLoading$.next(true);
    this.systemService.listPaginated$(sort)
      .pipe(
        take(1)
      )
      .subscribe((res) => {
        console.log('res', res.data);
        this.systems$.next(res.data);
        this.paginate.savePage(res.next, pageEvent);
        this.isLoading$.next(false);
        this.count$.next(res.count);
      });
  }

}
