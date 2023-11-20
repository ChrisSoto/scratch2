import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Block, BlockGroup, BlockTypes } from '../models/block.model';
import { BlockGroupService } from './block-group.service';

@Component({
  selector: 'be-block-group',
  templateUrl: './block-group.component.html',
  styleUrls: ['./block-group.component.scss'],
  host: {
        '(document:keydown)': 'handleTab($event)'
    }
})
export class BlockGroupComponent {

  @Input()
  blockGroup: BlockGroup;

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
