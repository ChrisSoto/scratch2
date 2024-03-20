import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChurchSlideshow } from '../../interface/ChurchSlideshow.interface';
import { instance } from 'firebase-functions/lib/v1/providers/database';
import { Timestamp } from '@angular/fire/firestore';

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

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<NewSlidesFormComponent>);

  slideshowForm = this.fb.group({
    title: ['', Validators.required],
    pastor: ['Joe Puglia'],
    date: [new Date(), Validators.required],
    slides: [[],],
    activeSlide: [0,],
    activeSubSlide: [0,],
  });

  inThePast = signal(false);
  isUpdate = signal(false);

  constructor(@Inject(MAT_DIALOG_DATA) public slideshow: Partial<ChurchSlideshow>) { }

  ngOnInit() {
    if (this.slideshow && this.slideshow.date) {
      this.isUpdate.set(true);
      if (this.slideshow.date instanceof Timestamp) {
        const date = this.slideshow.date?.toDate();
        const aDayAgo = new Date();
        aDayAgo.setDate(aDayAgo.getDate() - 1);
        // disable the form if the date is in the past
        if (date < aDayAgo) {
          this.slideshowForm.controls.title.disable();
          this.slideshowForm.controls.date.disable();
          this.inThePast.set(true);
        }
        this.slideshowForm.patchValue(this.slideshow as any);
        this.slideshowForm.patchValue({ date });
        this.slideshowForm.markAsPristine();
      }
    }
  }

  ngOnDestroy () {
    this.slideshowForm.reset();
  }
}
