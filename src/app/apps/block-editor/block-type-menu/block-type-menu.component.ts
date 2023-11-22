import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BlockTypes } from '../models/block.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'block-type-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './block-type-menu.component.html',
  styleUrls: ['./block-type-menu.component.scss']
})
export class BlockTypeMenuComponent implements OnInit {

  @Output()
  addBlockEditorChange = new EventEmitter<BlockTypes>();

  blockTypes = BlockTypes;

  constructor() { }

  ngOnInit(): void {
  }

  addBlock(block: BlockTypes) {
    this.addBlockEditorChange.emit(block);
  }

}
