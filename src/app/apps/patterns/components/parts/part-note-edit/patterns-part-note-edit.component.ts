import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditStatus, PPart } from '../../../model/models.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../../util/confirm-delete/confirm-delete.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'patterns-part-note-edit',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDeleteComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './patterns-part-note-edit.component.html',
  styleUrl: './patterns-part-note-edit.component.scss'
})
export class PatternsPartNoteEditComponent {

  EditStatus = EditStatus;
  status = signal(EditStatus.NEW);

  private fb = inject(FormBuilder);
  private part: PPart = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);

  noteForm = this.fb.group({
    notes: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    // it can initialize in NEW or EDIT mode
    if (this.part) {
      this.noteForm.patchValue(this.part);
      if (this.part?.notes) {
        this.status.set(EditStatus.EDIT);
      }
    }
  }

  onUpdate() {
    const part = Object.assign(this.part, this.noteForm.value);
    this.dialogRef.close({ status: 'update', data: part });
  }

  onCancel() {
    this.dialogRef.close()
  }
}
