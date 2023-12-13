import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { RoleService } from '../../user/role.service';
import { FileStorageButtonComponent } from '../file-storage/file-storage-button/file-storage-button.component';

@Component({
  selector: 'text-area-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TextFieldModule,
    MarkdownModule,
    FileStorageButtonComponent,
  ],
  templateUrl: './text-area-editor.component.html',
  styleUrls: ['./text-area-editor.component.scss']
})
export class TextAreaEditorComponent {
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();
  @Output() cancelChange = new EventEmitter<boolean>();


  // image = inject(ImageStorageService);
  role = inject(RoleService);

  editMode = signal(false);

  save() {
    this.editMode.set(false);
    this.textChange.emit(this.text);
  }

  openImageList() {
    // this.image.open();
  }
}
