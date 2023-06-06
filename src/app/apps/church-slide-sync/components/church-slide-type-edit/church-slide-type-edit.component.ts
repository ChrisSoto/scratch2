import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChurchSlide } from '../../interface/ChurchSlideshow.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'church-slide-type-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './church-slide-type-edit.component.html',
  styleUrls: ['./church-slide-type-edit.component.scss']
})
export class ChurchSlideTypeEditComponent {
  @Input() slide!: ChurchSlide;

  editHymn() {
    console.log('edit hymn')
  }

  removeEmpty() { }
}
