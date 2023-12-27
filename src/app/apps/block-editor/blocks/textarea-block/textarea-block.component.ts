import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { BlockGroupService } from '../../block-group/block-group.service';
import { Block } from '../../models/block.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BlockTabService } from '../../services/block-tab.service';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { MarkdownPipe } from 'ngx-markdown';

@Component({
  selector: 'be-textarea-block',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    TextFieldModule,
    ReactiveFormsModule,
  ],
  providers: [
    MarkdownPipe
  ],
  templateUrl: './textarea-block.component.html',
  styleUrls: ['./textarea-block.component.scss']
})
export class TextareaBlockComponent implements OnInit {
  
  @ViewChild('textArea', { static: true })
  textArea!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('display', {static: true})
  display!: ElementRef<HTMLElement>;

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  @Input()
  block!: Block;

  @Input()
  index = 0;

  @Input()
  pIndex = 0;

  @Output()
  updateChange = new EventEmitter<Block>();

  @Output()
  removeChange = new EventEmitter<Block>();

  
  // height!: number;
  control = new UntypedFormControl();

  edit = signal<boolean>(false);
  id = signal<string>('data');

  fb = inject(UntypedFormBuilder);
  groupService = inject(BlockGroupService);
  tabService = inject(BlockTabService);

  constructor(private _ngZone: NgZone) {}

  

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(
      take(1)
    ).subscribe(
      () => this.autosize.resizeToFitContent(true)
    );
  }

  ngOnInit(): void {
    this.id.set(this.tabService.createId(this.pIndex, this.index));
    this.tabService.addInput(this.id());

    this.display.nativeElement.addEventListener('focusin', () => {
      console.log('focused!')
    })

    this.groupService.add(this.textArea);

    if (this.block.data) {
      this.control.setValue(this.block.data);
    } else {
      this.control.setValue('');
      this.edit.set(true);
    }

    // this.triggerResize();
  }

  onLeave(textArea: HTMLTextAreaElement) {
    if (!this.control.pristine) {
      this.block.data = this.control.value;
      this.updateChange.emit(this.block);
    }

    this.edit.set(this.block.data.length === 0);
  }

  onEnter(textArea: HTMLTextAreaElement) {
    this.edit.set(true);
    const timeout = setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(textArea.value.length, textArea.value.length);
      clearTimeout(timeout);
    }, 0);
  }

}
