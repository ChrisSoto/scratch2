
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Block } from 'src/app/apps/block-editor/models/block.model';
import { PData, PDataTree, PDataUpdate } from '../../../model/models.interface';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { BlockGroupComponent } from 'src/app/apps/block-editor/block-group/block-group.component';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';

function toDataTree(data: PData[]): PDataTree[] {
  const tree: PDataTree[] = [];

  for (let i = 0; i < data.length; i++) {
    tree.push({
      id: data[i].id,
      self: data[i],
      children: [],
      child: false,
      onlyTitle: data[i].data.blocks[0].data === '[[ hide-textarea ]]',
      generator: data[i].generatorIds.length > 0,
    });
  }

  // add children to parents
  for (let i = 0; i < tree.length; i++) {
    for (let j = 0; j < tree.length; j++) {
      if (tree[i].id !== '') {

        if (tree[i].id === tree[j].self.parentId) {
          tree[j].child = true;
          tree[i].children.push(tree[j].self);
        }
      }
    }
  }

  const newTree = [];

  // take all nodes with children and put 
  // them in their own array
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].children.length) {
      newTree.push(tree[i]);
    
    // a sibling
    } else if (!tree[i].child) {
      newTree.push(tree[i])
    }
  }

  return newTree;
}

@Component({
  selector: 'patterns-data-display',
  standalone: true,
  imports: [
    CommonFabButtonComponent,
    BlockGroupComponent,
  ],
  templateUrl: './patterns-data-display.component.html',
  styleUrl: './patterns-data-display.component.scss',
})
export class PatternsDataDisplayComponent {

  @Input({ transform: toDataTree })
  data: PDataTree[] = [];

  @Output()
  titleChange = new EventEmitter<PDataUpdate>();

  @Output()
  updateChange = new EventEmitter<PDataUpdate>();

  @Output()
  addChange = new EventEmitter<PDataUpdate>();

  @Output()
  removeChange = new EventEmitter<PDataUpdate>();

  @Output()
  generateChange = new EventEmitter<PDataTree>();

  public active = inject(PatternActiveSystemService);

  onAddChange(block: Block, index: number, data: PData) {
    this.addChange.emit({ block, index, data });
  }

  onTitleChange(title: string, index: number, data: PData) {
    this.titleChange.emit({ title, index, data })
  }

  onUpdateChange(block: Block, index: number, data: PData) {
    this.updateChange.emit({ block, index, data });
  }

  onRemoveChange(block: Block, data: PData) {
    const index = -1;
    this.removeChange.emit({ block, index, data });
  }

  onGenerateChange(data: PDataTree) {
    this.generateChange.emit(data);
  }

}
