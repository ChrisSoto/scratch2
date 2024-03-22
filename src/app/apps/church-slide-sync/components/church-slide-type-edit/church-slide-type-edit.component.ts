import { Component, Input, inject, signal } from '@angular/core';
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
import { EditColorComponent } from '../../dialogs/edit-color/edit-color.component';
import { CommonImageGalleryDialogComponent } from 'src/app/shared/components/common-image-gallery-dialog/common-image-gallery-dialog.component';
import { ActionStatusService } from 'src/app/shared/services/action-status.service';

@Component({
  selector: 'church-slide-type-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonUploadImageDialogComponent,
  ],
  templateUrl: './church-slide-type-edit.component.html',
  styleUrls: ['./church-slide-type-edit.component.scss']
})
export class ChurchSlideTypeEditComponent {
  @Input() slide!: ChurchSlide;
  @Input() order!: number;
  @Input() editMode = false;

  imageUrl = signal('');

  private actionStatus = inject(ActionStatusService);

  dialog = inject(MatDialog);
  upload = inject(FileUploadService);
  active = inject(ActiveChurchSlideshowService);

  ngOnInit() {
    // switch (this.slide.type) {
    //   case 'HYMN':
    //     console.log('Hymn');
    //     break;
    //   case 'TEXT':
    //     console.log('Text');
    //     break;
    //   case 'IMAGE':
    //     console.log('Image');
    //     break;
    //   case 'EMPTY':
    //     console.log('Empty');
    //     break;
    //   default:
    //     console.log('default');
    //     break;
    // }
  }

  editHymn() {
    const hymn$$ = this.dialog.open(EditHymnComponent)
      .afterClosed()
      .subscribe((data: ChurchHymn) => {
        
        if (!data) {
          hymn$$.unsubscribe();
          return;
        };

        this.active.saveHymn(data, this.order)
          .then(() => this.actionStatus.success('Hymn updated'))
          .finally(() => hymn$$.unsubscribe())
      })
  }

  editColor() {
    const color$$ = this.dialog.open(EditColorComponent)
      .afterClosed()
      .subscribe((color: string) => {
        
        if (!color) {
          color$$.unsubscribe();
          return;
        };
          
        this.active.saveColor(color, this.order)
          .finally(() => color$$.unsubscribe())
      })
  }

  uploadFromGallery() {
    const gallery$$ = this.dialog.open(CommonImageGalleryDialogComponent, { data: 'opc' })
      .afterClosed()
      .subscribe(imageUrl => {
        
        if (!imageUrl) {
          gallery$$.unsubscribe();
          return;
        };

        this.active.saveImage(imageUrl, this.order)
          .finally(() => gallery$$.unsubscribe())
      });
  }

  uploadImage() {
    const image$$ = this.dialog.open(CommonUploadImageDialogComponent)
      .afterClosed()
      .pipe(
        filter((file: File) => file && 'name' in file),
        mergeMap((file: File) => this.upload.uploadFile('opc', file)),
        filter((imageUrl: string) => !!imageUrl),
      )
      .subscribe(imageUrl => {

        if (!imageUrl) {
          image$$.unsubscribe();
          return;
        }

        this.active.saveImage(imageUrl, this.order)
          .then(() => {
            this.actionStatus.success('Image updated!')
          })
          .finally(() => image$$.unsubscribe())
      });
  }

  removeSlide() {
    const remove$$ = this.dialog.open(RemoveSlideComponent)
      .afterClosed()
      .subscribe(removed => {

        if (!removed) {
          remove$$.unsubscribe();
          return;
        };

        this.active.removeSlide(this.order)
          .finally(() => remove$$.unsubscribe())
      })
  }
}
