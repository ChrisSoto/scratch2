import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBible, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BlockTypes } from '../models/block.model';

@Component({
  selector: 'block-type-menu',
  templateUrl: './block-type-menu.component.html',
  styleUrls: ['./block-type-menu.component.scss']
})
export class BlockTypeMenuComponent implements OnInit {

  @Output()
  addBlockEditorChange = new EventEmitter<BlockTypes>();

  blockTypes = BlockTypes;

  faBible: IconDefinition = faBible;

  constructor() { }

  ngOnInit(): void {
  }

  addBlock(block: BlockTypes) {
    this.addBlockEditorChange.emit(block);
  }

}
