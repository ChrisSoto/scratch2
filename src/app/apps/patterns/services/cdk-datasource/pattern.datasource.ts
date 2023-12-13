import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { PSystem } from '../../model/models.interface';
import { GeneralQuery } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { PatternService } from '../pattern.service';

@Injectable()
export class PatternDataSource extends DataSource<PSystem> {

  patterns$ = new BehaviorSubject<PSystem[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  nextPage$ = new BehaviorSubject<QueryDocumentSnapshot | null>(null);
  count$ = new BehaviorSubject<number>(0);

  constructor(
    private patternService: PatternService,
    private paginate: PaginationService,
  ) {
    super();
  }

  connect(_collectionViewer: CollectionViewer): Observable<PSystem[]> {
    return this.patterns$.asObservable();
  }

  disconnect(_collectionViewer: CollectionViewer): void {
    this.patterns$.complete();
  }

  load(sort?: GeneralQuery[]) {
    this.isLoading$.next(true);
    this.patternService.list$(sort)
      .subscribe((patterns: PSystem[]) => {
        this.patterns$.next(patterns);
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
    this.patternService.listPaginated$(sort)
      .pipe(
        take(1)
      )
      .subscribe((res) => {
        this.patterns$.next(res.data);
        this.paginate.savePage(res.next, pageEvent);
        this.isLoading$.next(false);
        this.count$.next(res.count);
      });
  }

}
