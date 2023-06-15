import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChurchSlide } from '../../interface/ChurchSlideshow.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonUploadImageDialogComponent } from 'src/app/shared/components/common-upload-image-dialog/common-upload-image-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { filter, merge, mergeMap, of } from 'rxjs';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { RemoveSlideComponent } from '../../dialogs/remove-slide/remove-slide.component';

@Component({
  selector: 'church-slide-type-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonUploadImageDialogComponent
  ],
  templateUrl: './church-slide-type-edit.component.html',
  styleUrls: ['./church-slide-type-edit.component.scss']
})
export class ChurchSlideTypeEditComponent {
  @Input() slide!: ChurchSlide;
  @Input() order!: number;

  dialog = inject(MatDialog);
  upload = inject(FileUploadService);
  active = inject(ActiveChurchSlideshowService);

  editHymn() { }

  editColor() { }

  uploadImage() {
    this.dialog.open(CommonUploadImageDialogComponent, { maxHeight: '80%', width: '50%' })
      .afterClosed()
      .pipe(
        filter((file: File) => file && 'name' in file),
        mergeMap((file: File) => this.upload.uploadFile('opc', file)),
      )
      .subscribe(imageUrl => {
        this.active.saveImage(imageUrl, this.order);
      });
  }

  removeSlide() {
    this.dialog.open(RemoveSlideComponent, { maxHeight: '80%', width: '300px' })
      .afterClosed()
      .pipe(
        mergeMap((remove) => {
          return remove ? this.active.removeSlide(this.order) : of(null)
        })
      )
      .subscribe(removed => {
        console.log(removed);
      })
  }
}
