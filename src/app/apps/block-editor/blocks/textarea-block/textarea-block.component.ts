import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { BlockGroupService } from '../../block-group/block-group.service';
import { Block } from '../../models/block.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'be-textarea-block',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textarea-block.component.html',
  styleUrls: ['./textarea-block.component.scss']
})
export class TextareaBlockComponent implements OnInit {
  
  @ViewChild('textArea', { static: true })
  textArea!: ElementRef<HTMLTextAreaElement>;

  @Input()
  block!: Block;

  @Output()
  updateChange = new EventEmitter<Block>();

  @Output()
  removeChange = new EventEmitter<Block>();

  edit: boolean = false;
  height!: number;
  control = new UntypedFormControl();

  fb = inject(UntypedFormBuilder);
  groupService = inject(BlockGroupService);

  ngOnInit(): void {
    this.groupService.add(this.textArea);
    if (this.block.data) {
      this.control.setValue(this.block.data);
    } else {
      this.control.setValue('');
      this.edit = true;
    }
  }

  tabbed() {}

  onLeave(textArea: HTMLTextAreaElement) {
    if (!this.control.pristine) {
      this.block.data = this.control.value;
      this.updateChange.emit(this.block);
    }

    this.edit = this.block.data.length === 0;
  }

  onEnter(textArea: HTMLTextAreaElement) {
    this.edit = true;
    setTimeout(() => {
      console.log(this.groupService.blockGroups);
      textArea.focus();
    }, 1);
  }

  remove() {
    this.removeChange.emit(this.block);
  }

}
