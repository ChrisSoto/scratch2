import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditStatus, PSystem } from '../../../model/models.interface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeleteComponent } from '../../../util/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'patterns-system-edit',
  standalone: true,
  templateUrl: './patterns-system-edit.component.html',
  styleUrls: ['./patterns-system-edit.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
  ],
})

//
//
// Dialog
//

export class PatternsSystemEditComponent implements OnInit {

  private dialogRef = inject(MatDialogRef);

  system: PSystem = inject<PSystem>(MAT_DIALOG_DATA);

  Status = EditStatus;
  status = signal(EditStatus.NEW);
  submit = 'Save';
  deleteSystem = signal(false);

  systemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if (this.system && 'name' in this.system) {
      this.status.set(EditStatus.EDIT);
      this.submit = 'Update';
      this.systemForm.patchValue(this.system);
    }
  }

  onSave() {
    this.dialogRef.close({ status: 'create', data: this.systemForm.value });
  }

  onUpdate() {
    const system = { ...this.systemForm.value, ...{ id: this.system.id } } as PSystem;
    this.dialogRef.close({ status: 'update', data: system })
  }

  onDeleteChange(remove: boolean) {
    if (remove) {
      this.dialogRef.close({ status: 'delete', data: this.system });
    } else {
      this.deleteSystem.set(false);
    }
  }

  onCancel() {
    this.dialogRef.close({ status: 'cancel', data: null });
  }
}
