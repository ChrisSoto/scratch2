import { Component, OnInit } from '@angular/core';
import { BlockGroupEditAbstractComponent } from '../block-group-edit-abstract/block-group-edit-abstract.component';
import { BlockGroupEditService } from '../block-group-edit-abstract/block-group-edit.service';
import { Block, BlockGroup, BlockTypes } from '../models/block.model';

@Component({
  selector: 'app-block-group-edit',
  templateUrl: './block-group-edit.component.html',
  styleUrls: ['./block-group-edit.component.scss']
})
export class BlockGroupEditComponent extends BlockGroupEditAbstractComponent {

  constructor(public override bge: BlockGroupEditService) {
    super(bge);
  }

  override saveChange(): void {
    
  }

}
