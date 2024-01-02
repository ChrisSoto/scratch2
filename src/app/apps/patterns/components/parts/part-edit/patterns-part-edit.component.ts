import { Component, EventEmitter, signal, OnInit, Output, inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditStatus, PPart } from '../../../model/models.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeleteComponent } from '../../../util/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GeneratorIdListComponent } from '../generator-id-list/generator-id-list.component';
import { PartListSelectComponent } from '../part-list-select/part-list-select.component';
import { Timestamp } from '@angular/fire/firestore';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'patterns-part-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    GeneratorIdListComponent,
    PartListSelectComponent,
  ],
  templateUrl: './patterns-part-edit.component.html',
  styleUrls: ['./patterns-part-edit.component.scss'],
})

//
//
// Dialog
//

export class PatternsPartEditComponent implements OnInit {

  @Output() cancelChange = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private part: PPart = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);

  Status = EditStatus;
  status = signal(EditStatus.NEW);
  deletePart = signal(false);
  selectedPart = signal<PPart | null>(null);

  partForm = this.fb.group({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    titleOnly: new FormControl<boolean>(false),
    generatorIds: new FormControl<string[]>([]),
  });

  ngOnInit(): void {
    // it can initialize in NEW or EDIT mode
    if (this.part) {
      // check if data is being edited
      if (this.part.name.length) {
        this.status.set(EditStatus.EDIT);
      }
  
      this.partForm.patchValue(this.part);
    }
  }

  onPartChange(part: PPart) {
    this.selectedPart.set(part);
    this.partForm.patchValue(part);
  }

  onCopy() {
    this.status.set(EditStatus.NEW);
  }

  onCreateNewPart() {
    this.status.set(EditStatus.NEW);
    this.selectedPart.set(null);
    this.partForm.patchValue({
      name: '',
      description: '',
      generatorIds: []
    });
  }

  onUseExistingPart() {
    this.status.set(EditStatus.REUSE);
    this.selectedPart.set(null);
  }

  onCreate() {
    if (this.status() === this.Status.REUSE) {
      this.dialogRef.close({ status: 're-use', data: this.selectedPart() });
    } else {
      this.dialogRef.close({ status: 'create', data: this.partForm.value });
    }
  }

  onUpdate() {
    // const part = { ...this.partForm.value, ...{ id: this.part.id } } as PPart;
    const part = Object.assign(this.part, this.partForm.value) as PPart;
    this.dialogRef.close({ status: 'update', data: part });
  }

  onDeleteChange(remove: boolean) {
    if (remove) {
      this.dialogRef.close({ status: 'delete', data: this.part });
    } else {
      this.deletePart.set(false);
    }
  }

  onCancel() {
    this.dialogRef.close()
  }

}
