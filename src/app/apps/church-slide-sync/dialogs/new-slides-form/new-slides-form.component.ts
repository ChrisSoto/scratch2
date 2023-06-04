import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-slides-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './new-slides-form.component.html',
  styleUrls: ['./new-slides-form.component.scss']
})
export class NewSlidesFormComponent {

  formBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<NewSlidesFormComponent>);

  newSlidesForm = new FormGroup({
    title: new FormControl(''),
    pastor: new FormControl('Joe Puglia'),
    date: new FormControl(new Date()),
    slides: new FormControl([])
  })
}
