import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { FileStorageService } from '../../services/file-storage.service';

const IMAGES = [
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 1'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 2'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 3'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 1'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 2'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 3'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 1'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 2'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 3'
  },
  {
    src: 'https://picsum.photos/200',
    caption: 'Image 1'
  }
]
@Component({
  selector: 'app-common-image-gallery-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './common-image-gallery-dialog.component.html',
  styleUrl: './common-image-gallery-dialog.component.scss'
})
export class CommonImageGalleryDialogComponent {
  
  storageService = inject(FileStorageService);
  dialogRef = inject(MatDialogRef<CommonImageGalleryDialogComponent>);

  selectedUrl = signal<string | null>(null);
  images = signal<string[]>([])

  constructor(@Inject(MAT_DIALOG_DATA) public directory: string) { }

  ngOnInit() {
    this.storageService.listAll(this.directory)
      .then(res => {
        if (res.urls.length) {
          this.images.set(res.urls);
        }
      });
  }

  selectItem(item: string) {
    if (this.selectedUrl() === item) {
      this.selectedUrl.set(null);
      return;
    }
    this.selectedUrl.set(item);
  }

  close() {
    this.dialogRef.close(this.selectedUrl());
  }
}
