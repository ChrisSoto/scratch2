import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { text } from '@fortawesome/fontawesome-svg-core';
import { BlockGroupService } from '../../block-group/block-group.service';
import { Block, BlockTypes } from '../../models/block.model';

@Component({
  selector: 'be-textarea-block',
  templateUrl: './textarea-block.component.html',
  styleUrls: ['./textarea-block.component.scss']
})
export class TextareaBlockComponent implements OnInit {
  
  @ViewChild('textArea', { static: true })
  textArea: ElementRef<HTMLTextAreaElement>;

  // @ViewChild('textAreaDiv', { static: true })
  // textAreaDiv: ElementRef<HTMLDivElement>;

  @Input()
  block: Block;

  @Output()
  updateChange = new EventEmitter<Block>();

  @Output()
  removeChange = new EventEmitter<Block>();

  edit: boolean = false;
  height: number = null;
  control = new UntypedFormControl();

  constructor(
    public fb: UntypedFormBuilder,
    public groupService: BlockGroupService,
  ) { }

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
