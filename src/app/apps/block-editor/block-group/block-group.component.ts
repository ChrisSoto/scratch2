import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Block, BlockGroup } from '../models/block.model';
import { BlockTitleComponent } from '../block-title/block-title.component';
import { TextareaBlockComponent } from '../blocks/textarea-block/textarea-block.component';
import { AddBlockComponent } from '../add-block/add-block.component';
import { BlockTabService } from '../services/block-tab.service';

@Component({
  selector: 'be-block-group',
  standalone: true,
  imports: [
    BlockTitleComponent,
    TextareaBlockComponent,
    AddBlockComponent,
  ],
  providers: [
    BlockTabService,
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

  @Input()
  OnlyTitle = false;

  @Input()
  index = 0;

  @Output()
  titleChange = new EventEmitter<string>();

  @Output()
  updateChange = new EventEmitter<Block>();

  @Output()
  addChange = new EventEmitter<Block>();

  @Output()
  removeChange = new EventEmitter<Block>();

  tabService = inject(BlockTabService);

  handleTab(event: KeyboardEvent) {
    if (event.code === 'ArrowDown') {
      this.tabService.tabDown();
    } else if (event.code === 'ArrowUp') {
      this.tabService.tabUp();
    }
  };

}
