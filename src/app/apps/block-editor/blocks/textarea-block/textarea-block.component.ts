import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { BlockGroupService } from '../../block-group/block-group.service';
import { Block } from '../../models/block.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BlockTabService } from '../../services/block-tab.service';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { MarkdownModule, MarkdownPipe, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'be-textarea-block',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    TextFieldModule,
    ReactiveFormsModule,
    MarkdownModule,
  ],
  templateUrl: './textarea-block.component.html',
  styleUrls: ['./textarea-block.component.scss']
})
export class TextareaBlockComponent implements OnInit, AfterViewChecked {
  
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

  displayHeight = signal(0);
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

    this.groupService.add(this.textArea);

    if (this.block.data) {
      this.control.setValue(this.block.data);
    } else {
      this.control.setValue('');
      this.edit.set(true);
    }

    this.control.valueChanges
      .subscribe(data => {
        if (this.textArea) {
          this.resizeTextArea(this.textArea.nativeElement);
        }
      })
  }

  ngAfterViewChecked(): void {
    this.setDisplayHeight()
  }

  onLeave(textArea: HTMLTextAreaElement) {
    if (!this.control.pristine) {
      this.block.data = this.control.value;
      this.updateChange.emit(this.block);
      this.control.markAsPristine();
    }

    this.setDisplayHeight();
    this.edit.set(this.control.value.length === 0);
  }

  onEnter() {
    this.edit.set(true);
    const timeout = setTimeout(() => {
      const textArea = this.textArea.nativeElement;
      this.resizeTextArea(textArea);
      textArea.focus();
      textArea.setSelectionRange(textArea.value.length, textArea.value.length);
      clearTimeout(timeout);
    }, 0);
  }

  private resizeTextArea(textArea: HTMLTextAreaElement) {
    // reset the height fixes issue where the height is too long.
    textArea.style.height = '';
    const scrollHeight = textArea.scrollHeight - 4;
    const displayHeight = this.displayHeight();
    const height = Math.max(scrollHeight, displayHeight);
    textArea.style.height = `${scrollHeight}px`;
  }

  private setDisplayHeight() {
    const display = this.display.nativeElement;
    if (display.clientHeight > 0) {
      this.displayHeight.set(display.clientHeight);
    }
    
  }

}
