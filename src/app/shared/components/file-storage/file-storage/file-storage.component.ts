import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileStorageService } from 'src/app/shared/services/file-storage.service';

@Component({
  selector: 'file-storage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.scss']
})
export class FileStorageComponent {
  @Input() path!: string;

  fileService = inject(FileStorageService);

  getImages(folder?: string) {

  }
}
