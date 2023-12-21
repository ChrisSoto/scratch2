import { Injectable, inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PData, PPart, PSystem } from '../model/models.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { BlockGroup, BlockTypes } from '../../block-editor/models/block.model';

@Injectable()
export class PatternDataService {

  path = 'p_data';

  private database = inject(DatabaseService);
  private sortToQuery = inject(SortToQueryConstraintsService);

  // get pattern id, attatch it to p_data
  // System
  //  Part
  //    Data
  //
  
  create(data: PData, index: number): Promise<void> {
    data.id = this.database.createId();
    data.order = index;
    return this.database.set(`${this.path + '/' + data.id}`, data);
  }

  private createData(system: PSystem, blockGroup: BlockGroup, index: number): PData {
    return {
      id: this.database.createId(),
      systemId: system.systemId as string,
      patternId: system.id,
      parentId: '',
      partId: system.parts[index].id,
      order: index,
      depth: 0,
      data: blockGroup
    }
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list$(sort?: GeneralQuery[]): Observable<PData[]> {
    // convert sort to Firebase QueryConstraint
    if (sort) {
      return this.database.list(this.path, ...this.sortToQuery.convert(sort));
    } else {
      return this.database.list(this.path);
    }
  }

  update(data: Partial<PData>) {
    return this.database.update(this.path + '/' + data.id, data);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }

  partToBlockGroup(part: PPart): BlockGroup {
    return {
      title: part.name,
      blocks: [
        {
          type: BlockTypes.TXT,
          data: part.description,
          order: 0
        }
      ]
    }
  }
}
