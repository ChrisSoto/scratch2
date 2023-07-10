import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'text-area-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TextFieldModule
  ],
  templateUrl: './text-area-editor.component.html',
  styleUrls: ['./text-area-editor.component.scss']
})
export class TextAreaEditorComponent {
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();
  @Output() cancelChange = new EventEmitter<boolean>();
}
