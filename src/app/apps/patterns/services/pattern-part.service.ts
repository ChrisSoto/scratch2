import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { Observable, first } from 'rxjs';

import { PPart, PSystem } from '../model/models.interface';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PaginatedCollection } from 'src/app/shared/interface/pagination.model';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { PatternSystemService } from './pattern-system.service';

@Injectable()
export class PatternPartService {

  // I need to add each part as it's own because
  //    I want to resuse them
  //    I need to reference them independently
  //    ...

  path = 'p_parts';

  private systemService = inject(PatternSystemService);
  private database = inject(DatabaseService);
  private sortToQuery = inject(SortToQueryConstraintsService);


  create(part: Partial<PPart>): Promise<DocumentReference<PPart>> {
    return this.database.add(this.path, part);
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list$(sort?: GeneralQuery[]): Observable<PPart[]> {
    if (!sort) {
      return this.database.list(this.path);
    }
    return this.database.list(this.path, ...this.sortToQuery.convert(sort));
  }

  listPaginated$(sort?: GeneralQuery[]): Observable<PaginatedCollection<PPart>> {
    if (!sort) {
      return this.database.listPaginated(this.path);
    }
    return this.database.listPaginated(this.path, ...this.sortToQuery.convert(sort));
  }

  update(part: Partial<PPart>) {
    return this.database.update(this.path + '/' + part.id, part);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }

  // used only once

  addAlreadyCreatedSystemPartsToDatabase() {
    this.systemService.list$()
      .pipe(
        first()
      )
      .subscribe(res => {
        res.map(systems => {
          systems.parts?.map(part => {
            this.create(part)
          })
        })
      })
  }

  // I think i need to remove this
  newPart(system: PSystem): Partial<PPart> {
    return {
      name: '',
      description: '',
    };
  }
}




