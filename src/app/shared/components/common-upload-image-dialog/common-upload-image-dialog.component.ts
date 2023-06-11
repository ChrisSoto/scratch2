import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-common-upload-image-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './common-upload-image-dialog.component.html',
  styleUrls: ['./common-upload-image-dialog.component.scss']
})
export class CommonUploadImageDialogComponent {
  dialogRef = inject(MatDialogRef);
  imageResult$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  imageFile$: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

  selectImage(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.imageFile$.next(file);
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      this.imageResult$.next(result);
    };
  }

  uploadImage() {
    this.dialogRef.close(this.imageFile$.value);
  }
}

