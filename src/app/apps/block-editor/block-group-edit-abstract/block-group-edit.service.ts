import { Injectable } from '@angular/core';
import { Block, BlockGroup } from '../models/block.model';

@Injectable({
  providedIn: 'root'
})
export class BlockGroupEditService {

  constructor() { }

  title(blockGroup: BlockGroup, title: string): BlockGroup {
    blockGroup.title = title;
    return blockGroup;
  }

  addBlock(blockGroup: BlockGroup, block: Block): BlockGroup {
    blockGroup.blocks.push(block);
    blockGroup.blocks.sort((a, b) =>  a.order - b.order );
    blockGroup.blocks = this.reOrder(blockGroup, block);
    return blockGroup;
  }

  removeBlock(blockGroup: BlockGroup, block: Block): BlockGroup {
    blockGroup.blocks.splice(block.order, 1);
    blockGroup.blocks = this.reOrder(blockGroup, block);
    return blockGroup;
  }

  reOrder(blockGroup: BlockGroup, block: Block): Block[] {
    return blockGroup.blocks.map((block, i) => {
      block.order = i;
      return block;
    })
  }
}
