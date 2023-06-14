import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLinePipe } from '../../pipes/new-line.pipe';
import { ChurchHymn } from '../../interface/ChurchSlideshow.interface';

@Component({
  selector: 'hymn-verse',
  standalone: true,
  imports: [
    CommonModule,
    NewLinePipe
  ],
  templateUrl: './hymn-verse.component.html',
  styleUrls: ['./hymn-verse.component.scss']
})
export class HymnVerseComponent {
  @Input() hymn!: ChurchHymn | null;
  @Input() verse!: string[] | null;
  @Input() refrain!: string[] | null;
  @Input() order: number | null = 0;
}
