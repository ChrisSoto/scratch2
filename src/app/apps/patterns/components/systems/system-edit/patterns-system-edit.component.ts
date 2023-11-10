import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PSystem } from '../../../model/models.interface';
import { ActiveSystemService } from '../../../services/active-system.service';
import { SystemService } from '../../../services/system.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeleteComponent } from '../../../util/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { SystemPartService } from '../../../services/system-part.service';
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
  providers: [
    ActiveSystemService,
    SystemService,
    SystemPartService,
  ]
})
export class PatternsSystemEditComponent implements OnInit {

  public active = inject(ActiveSystemService);
  private systemService = inject(SystemService);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<PatternsSystemEditComponent>);
  private snackBar = inject(MatSnackBar);

  system: PSystem = inject(MAT_DIALOG_DATA);

  status = 'New';
  submit = 'Save';
  deleteSystem = false;

  systemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(

  ) { }

  ngOnInit(): void {
    if ('name' in this.system) {
      this.status = 'Edit';
      this.submit = 'Update';
      this.systemForm.patchValue(this.system);
    }
  }

  onCancel() {
    this.dialogRef.close({ status: 'cancel' });
  }

  onDelete() {
    this.deleteSystem = true;
  }

  onConfirmChange(remove: boolean) {
    if (remove && this.active.system.id) {
      this.active.remove(this.active.system.id)
        .then(_ => {
          this.active.closeSystemDialog();
          this.router.navigate(['patterns/view'])
            .then(() => {
              this.snackBar.open('System Deleted!', undefined, { duration: 3000 })
            })
        });
    } else {
      this.deleteSystem = false;
    }
  }

  onSave() {
    const system = this.systemForm.value as PSystem;
    this.systemService.create(system)
      .then(val => {
        this.router.navigate(['patterns/edit/' + val.id]);
        this.snackBar.open('New System Created!', undefined, { duration: 3000 })
      });
  }

  onUpdate() {
    const system = { ...this.systemForm.value, ...{ id: this.system.id } } as PSystem;
    this.active.update(system);
  }
}
