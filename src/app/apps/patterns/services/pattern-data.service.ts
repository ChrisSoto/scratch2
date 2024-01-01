import { Injectable, inject } from '@angular/core';
import { DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PData, PPart, PSystem, PSystemType } from '../model/models.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { BlockGroup, BlockTypes } from '../../block-editor/models/block.model';
import { PatternBlockService } from './pattern-block.service';

@Injectable()
export class PatternDataService {

  path = 'p_data';

  private database = inject(DatabaseService);
  private sortToQuery = inject(SortToQueryConstraintsService);
  private patternBlockService = inject(PatternBlockService);

  // get pattern id, attatch it to p_data
  // System
  //  Part
  //    Data
  //
  
  create(data: PData[], index: number, depth?: number): Promise<void[]> {
    const promises = [];
    for (let i = 0; i < data.length; i++) {
      data[i].id = this.database.createId();
      data[i].order = index + i;
      data[i].depth = depth ? depth : 0;
      promises.push(this.database.set(`${this.path + '/' + data[i].id}`, data[i]));
    }

    return Promise.all(promises);
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

  convertPartsToData(system: PSystem, data: PData | null): PData[] {
    let parts = [];
    // this is a pattern

    for (let i = 0; i < system.parts.length; i++) {
      const part = system.parts[i];
      const dataPart: PData =  {
        id: '',
        systemId: !data ? system.systemId as string : system.id,
        patternId: !data ? system.id : data.patternId,
        parentId: !data ? '' : data.id,
        partId: part.id,
        generatorIds: part.generatorIds ? part.generatorIds : [],
        order: -1,
        depth: 0,
        data: this.patternBlockService.convert(part)
      }

      parts.push(dataPart);
    }
    
    return parts;
  }
}
