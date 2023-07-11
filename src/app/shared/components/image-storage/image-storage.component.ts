import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'image-storage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-storage.component.html',
  styleUrls: ['./image-storage.component.scss']
})
export class ImageStorageComponent {
  @Input() path!: string;
}
