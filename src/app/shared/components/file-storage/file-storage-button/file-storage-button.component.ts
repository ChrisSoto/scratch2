import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileStorageComponent } from '../file-storage/file-storage.component';

@Component({
  selector: 'file-storage-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './file-storage-button.component.html',
  styleUrls: ['./file-storage-button.component.scss']
})
export class FileStorageButtonComponent {
  @Input() storageType: string = 'Image';

  dialog = inject(MatDialog);

  openStorageDialog() {
    this.dialog.open(FileStorageComponent);
  }
}
