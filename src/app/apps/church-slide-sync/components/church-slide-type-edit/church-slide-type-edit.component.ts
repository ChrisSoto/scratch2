import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChurchHymn, ChurchSlide } from '../../interface/ChurchSlideshow.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonUploadImageDialogComponent } from 'src/app/shared/components/common-upload-image-dialog/common-upload-image-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { filter, mergeMap, of } from 'rxjs';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { RemoveSlideComponent } from '../../dialogs/remove-slide/remove-slide.component';
import { EditHymnComponent } from '../../dialogs/edit-hymn/edit-hymn.component';
import { HymnService } from '../../services/hymn.service';
import { EditColorComponent } from '../../dialogs/edit-color/edit-color.component';
import { CommonImageGalleryDialogComponent } from 'src/app/shared/components/common-image-gallery-dialog/common-image-gallery-dialog.component';

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
  @Input() editMode = false;

  dialog = inject(MatDialog);
  upload = inject(FileUploadService);
  active = inject(ActiveChurchSlideshowService);

  editHymn() {
    this.dialog.open(EditHymnComponent)
      .afterClosed()
      .subscribe((data: ChurchHymn) => {
        this.active.saveHymn(data, this.order);
      })
  }

  editColor() {
    this.dialog.open(EditColorComponent)
      .afterClosed()
      .subscribe((color: string) => {
        this.active.saveColor(color, this.order);
      })
  }

  uploadFromGallery() {
    this.dialog.open(CommonImageGalleryDialogComponent, { maxHeight: '80%', width: '50%' , data: 'opc' })
      .afterClosed()
      .subscribe(imageUrl => {
        if (!imageUrl) return;
        this.active.saveImage(imageUrl, this.order);
      });
  }

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
