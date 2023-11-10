import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PPart } from '../../../model/models.interface';
import { ActiveSystemService } from '../../../services/active-system.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeleteComponent } from '../../../util/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { SystemService } from '../../../services/system.service';
import { SystemPartService } from '../../../services/system-part.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'patterns-part-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
  ],
  providers: [
    ActiveSystemService,
    SystemService,
    SystemPartService,
  ],
  templateUrl: './patterns-part-edit.component.html',
  styleUrls: ['./patterns-part-edit.component.scss'],
})
export class PatternsPartEditComponent implements OnInit {

  @Output() cancelChange = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);

  public data: { part: PPart, index: number } = inject(MAT_DIALOG_DATA);
  private active = inject(ActiveSystemService);

  status = 'New';
  deletePart = false;

  partForm = this.fb.group({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    generatorIds: new FormControl<string[]>([]),
  });

  ngOnInit(): void {
    if ('part' in this.data) {
      this.status = 'Edit';
      this.partForm.patchValue(this.data.part);
    }
  }

  onCancel() {
    // it emits so the part editor not in a dialog will close
    this.cancelChange.emit(true);
    // it will close the dialogRef if needed
    // this.active.closePartDialog();
  }

  onDelete() {
    this.deletePart = true;
  }

  onSave() {
    const part = Object.assign(this.partForm.value, { generatorId: this.active.system.id }) as Partial<PPart>;
    this.active.addPart(part);
    this.cancelChange.emit(true);
  }

  onUpdate() {
    const part = this.partForm.value as PPart;
    this.active.updatePart(part, this.data.index);
    // this.active.closePartDialog();
  }

  onConfirmChange(remove: boolean) {
    if (remove) {
      this.active.removePart(this.data.index);
      // this.active.closePartDialog();
    } else {
      this.deletePart = false;
    }
  }

}
