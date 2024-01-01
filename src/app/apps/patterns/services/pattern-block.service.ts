import { Injectable } from '@angular/core';
import { PPart } from '../model/models.interface';
import { BlockGroup, BlockTypes } from '../../block-editor/models/block.model';

@Injectable()
export class PatternBlockService {

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
