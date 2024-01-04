
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { Block } from 'src/app/apps/block-editor/models/block.model';
import { PData, PDataTree, PDataTree2, PDataUpdate } from '../../../model/models.interface';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { BlockGroupComponent } from 'src/app/apps/block-editor/block-group/block-group.component';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

function toDataTree(data: PData[]): PDataTree[] {
  const tree: PDataTree[] = [];

  for (let i = 0; i < data.length; i++) {
    tree.push({
      id: data[i].id,
      self: data[i],
      children: [],
      child: false,
      showTextarea: data[i].data.blocks[0].data !== '[[ hide-textarea ]]',
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
    FormsModule,
    DragDropModule,
    BlockGroupComponent,
    MatExpansionModule,
    CdkAccordionModule,
    MatIconModule,
  ],
  templateUrl: './patterns-data-display.component.html',
  styleUrl: './patterns-data-display.component.scss',
})
export class PatternsDataDisplayComponent {

  @Input()
  dataTree: PDataTree2[] = [];

  @Input({ transform: toDataTree })
  data: PDataTree[] = [];

  @Input()
  move = false;

  @Input()
  openAll = false;

  @Output()
  titleChange = new EventEmitter<PDataUpdate>();

  @Output()
  updateChange = new EventEmitter<PDataUpdate>();

  @Output()
  addChange = new EventEmitter<PDataUpdate>();

  @Output()
  removeChange = new EventEmitter<PDataUpdate>();

  @Output()
  generateChange = new EventEmitter<PDataTree2>();

  public active = inject(PatternActiveSystemService);

  onAddChange(block: Block, index: number, data: PData) {
    this.addChange.emit({ block, index, data });
  }

  onTitleChange(title: string, index: number, data: PData) {
    this.titleChange.emit({ title, index, data });
  }

  onUpdateChange(block: Block, index: number, data: PData) {
    this.updateChange.emit({ block, index, data });
  }

  onRemoveChange(block: Block, data: PData) {
    const index = -1;
    this.removeChange.emit({ block, index, data });
  }

  onGenerateChange(data: PDataTree2) {
    this.generateChange.emit(data);
  }

}
