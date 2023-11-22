import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { PSystem } from '../model/models.interface';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PaginatedCollection } from 'src/app/shared/interface/pagination.model';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Injectable()
export class PatternSystemService {

  path = 'p_systems';

  constructor(
    private database: DatabaseService,
    private sortToQuery: SortToQueryConstraintsService) { }

  create(system: Partial<PSystem>): Promise<DocumentReference<any>> {
    return this.database.add(this.path, system);
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list$(sort?: GeneralQuery[]): Observable<PSystem[]> {
    if (!sort) {
      return this.database.list(this.path);
    }
    return this.database.list(this.path, ...this.sortToQuery.convert(sort));
  }

  listPaginated$(sort?: GeneralQuery[]): Observable<PaginatedCollection<PSystem>> {
    if (!sort) {
      return this.database.listPaginated(this.path);
    }
    return this.database.listPaginated(this.path, ...this.sortToQuery.convert(sort));
  }

  update(system: Partial<PSystem>) {
    return this.database.update(this.path + '/' + system.id, system);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }
}
