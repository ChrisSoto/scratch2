import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  where,
  orderBy,
  limit,
  limitToLast,
  startAt,
  startAfter,
  endAt,
  endBefore,
  QueryConstraint,
  QueryConstraintType,
  OrderByDirection,
  WhereFilterOp,
  FieldPath
} from 'firebase/firestore';

export interface GeneralQuery {
  name: QueryConstraintType,
  operator?: WhereFilterOp,
  direction?: OrderByDirection,
  field?: string | FieldPath;
  value?: unknown | unknown[];
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SortToQueryConstraintsService {

  constructor() { }

  convert(sort: GeneralQuery | GeneralQuery[]): QueryConstraint[] {
    let queries: QueryConstraint[] = [];

    if (!Array.isArray(sort)) {
      queries.push(this.create(sort));
    } else {
      for (let i = 0; i < sort.length; i++) {
        const query = this.create(sort[i]);
        if (query) queries.push(query);
      }
    }
    return queries;
  }

  convertFromSort(sort: Sort): GeneralQuery[] {
    return [{
      name: 'orderBy',
      direction: sort.direction as OrderByDirection,
      field: sort.active,
    }];
  }

  private create(sort?: GeneralQuery): QueryConstraint {
    if (!sort) sort = { name: 'orderBy', field: 'created', direction: 'desc' };

    switch (sort.name) {
      case ('where'):
        if (sort.field && sort.operator) {
          return where(sort.field, sort.operator, sort.value);
        }

        return this.defaultQuery();
      case ('orderBy'):
        if (sort.field && sort.direction) {
          return orderBy(sort.field, sort.direction);
        } else if (sort.field) {
          return orderBy(sort.field);
        }
        
        return this.defaultQuery();
      case ('limit'):
        return sort.limit ? limit(sort.limit) : this.defaultQuery();
      case ('limitToLast'):
        return sort.limit ? limitToLast(sort.limit) : this.defaultQuery();
      case ('startAt'):
        return startAt(sort.value);
      case ('startAfter'):
        return startAfter(sort.value);
      case ('endAt'):
        return endAt(sort.value);
      case ('endBefore'):
        return endBefore(sort.value);
      default:
        return this.defaultQuery();
    }
  }

  private defaultQuery() {
    console.warn('query couldnt compile and sent a default one...');
    return orderBy('created', 'desc');
  }
}
