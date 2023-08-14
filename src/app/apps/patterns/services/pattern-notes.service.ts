import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DocumentReference, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PSystem } from '../model/models.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';

@Injectable()
export class PatternNotesService {

  path = 'p_notes';

  constructor(
    private database: DatabaseService,
    private sortToQuery: SortToQueryConstraintsService) { }

  create(system: Partial<PSystem>): Promise<DocumentReference<any>> {
    return this.database.add(this.path, system);
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list$(sort?: Sort): Observable<PSystem[]> {
    // convert sort to Firebase QueryConstraint
    if (sort) {
      const query = this.sortToQuery.convertFromSort(sort)
      return this.database.list(this.path, ...this.sortToQuery.convert(query));
    } else {
      return this.database.list(this.path);
    }
  }

  update(system: Partial<PSystem>) {
    return this.database.update(this.path + '/' + system.id, system);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }
}
