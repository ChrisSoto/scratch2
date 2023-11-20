import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Block, BlockGroup, BlockTypes } from '../models/block.model';
import { BlockGroupEditService } from './block-group-edit.service';

@Component({
  selector: 'app-block-group-edit-abstract',
  templateUrl: './block-group-edit-abstract.component.html',
  styleUrls: ['./block-group-edit-abstract.component.scss']
})
export class BlockGroupEditAbstractComponent implements OnInit {


  blockGroup$ = new BehaviorSubject<BlockGroup>({
    title: '',
    blocks: [
      {
        type: BlockTypes.TXT,
        data: '',
        order: 0
      }
    ]
  });

  constructor(public bge: BlockGroupEditService) { }

  ngOnInit(): void {
  }

  onTitleChange(title: string) {
    this.blockGroup$.next(this.bge.title(this.blockGroup$.value, title));
    this.saveChange(this.blockGroup$.value);
  }

  onAddChange(block: Block) {
    this.blockGroup$.next(this.bge.addBlock(this.blockGroup$.value, block));
    this.saveChange(this.blockGroup$.value);
  }

  onRemoveChange(block: Block) {
    this.blockGroup$.next(this.bge.removeBlock(this.blockGroup$.value, block));
    this.saveChange(this.blockGroup$.value);
  }
  
  onUpdateChange(block: Block) {
    this.blockGroup$.next(this.blockGroup$.value);
    this.saveChange(this.blockGroup$.value);
  }

  saveChange(blockGroup: BlockGroup) {
    console.log(this.blockGroup$);
  }

}
