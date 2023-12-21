import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Block, BlockGroup } from '../models/block.model';
import { BlockTitleComponent } from '../block-title/block-title.component';
import { TextareaBlockComponent } from '../blocks/textarea-block/textarea-block.component';
import { AddBlockComponent } from '../add-block/add-block.component';

@Component({
  selector: 'be-block-group',
  standalone: true,
  imports: [
    BlockTitleComponent,
    TextareaBlockComponent,
    AddBlockComponent,
  ],
  templateUrl: './block-group.component.html',
  styleUrls: ['./block-group.component.scss'],
  host: {
        '(document:keydown)': 'handleTab($event)'
    }
})
export class BlockGroupComponent {

  @Input()
  blockGroup!: BlockGroup;

  @Output()
  titleChange = new EventEmitter<string>();

  @Output()
  updateChange = new EventEmitter<Block>();

  @Output()
  addChange = new EventEmitter<Block>();

  @Output()
  removeChange = new EventEmitter<Block>();

  handleTab(event: KeyboardEvent) { 
    if (event.code === 'Tab') {
      console.log('tab')
    }
  };

}
