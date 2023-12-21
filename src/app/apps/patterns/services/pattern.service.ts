import { Injectable, inject } from '@angular/core';
import { DocumentReference, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PSystem } from '../model/models.interface';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { PatternSystemService } from './pattern-system.service';
import { Router } from '@angular/router';
import { PaginatedCollection } from 'src/app/shared/interface/pagination.model';

@Injectable()
export class PatternService {

  path = 'p_patterns';

  db = inject(DatabaseService);
  sortToQuery = inject(SortToQueryConstraintsService);
  systemService = inject(PatternSystemService);
  router = inject(Router);

  createFromId(patternId: string) {
    // get the pattern by ID
    this.systemService.read(patternId)
      .then(res => {
        const system = res.data() as Partial<PSystem>;
        delete system.id;
        delete system.created;
        delete system.createdBy;
        delete system.updated;
        delete system.updatedBy;
        system.systemId = patternId;
        return this.create(system);
      })
      .then((res) => {
        return this.router.navigate(['patterns/patterns/' + res.id]);
      });
  }

  create(system: Partial<PSystem>): Promise<DocumentReference<any>> {
    return this.db.add(this.path, system);
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.db.get(this.path + '/' + id);
  }

  read$(id: string) {
    return this.db.observe(this.path + '/' + id);
  }


  list$(sort?: GeneralQuery[]): Observable<PSystem[]> {
    if (!sort) {
      return this.db.list(this.path);
    }
    return this.db.list(this.path, ...this.sortToQuery.convert(sort));
  }

  // list$(sort?: Sort): Observable<PSystem[]> {
  //   // convert sort to Firebase QueryConstraint
  //   if (sort) {
  //     const query = this.sortToQuery.convertFromSort(sort)
  //     return this.db.list(this.path, ...this.sortToQuery.convert(query));
  //   } else {
  //     return this.db.list(this.path);
  //   }
  // }

  listPaginated$(sort?: GeneralQuery[]): Observable<PaginatedCollection<PSystem>> {
    if (!sort) {
      return this.db.listPaginated(this.path);
    }
    return this.db.listPaginated(this.path, ...this.sortToQuery.convert(sort));
  }

  update(system: Partial<PSystem>) {
    return this.db.update(this.path + '/' + system.id, system);
  }

  remove(id: string): Promise<void> {
    return this.db.delete(this.path + '/' + id);
  }

  addNoteToSystemPart(system: PSystem) {
    // return;
  }

}
