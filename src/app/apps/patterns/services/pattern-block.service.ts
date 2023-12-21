import { Injectable, inject } from '@angular/core';
import { PPart } from '../model/models.interface';
import { BlockGroup, BlockTypes } from '../../block-editor/models/block.model';
import { PatternDataService } from './pattern-data.service';

@Injectable()
export class PatternBlockService {

  dataService = inject(PatternDataService);

  

  partsToBlockGroups(parts: PPart[]): BlockGroup[] {
    return parts.map(part => this.convert(part));
  }

  convert(part: PPart): BlockGroup {
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
