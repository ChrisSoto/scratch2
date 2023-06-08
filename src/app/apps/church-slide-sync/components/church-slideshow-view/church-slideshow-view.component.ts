import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { MakeSquareDirective } from '../../directives/make-square.directive';

@Component({
  selector: 'church-slides-view',
  standalone: true,
  imports: [
    CommonModule,
    MakeSquareDirective
  ],
  templateUrl: './church-slideshow-view.component.html',
  styleUrls: ['./church-slideshow-view.component.scss']
})
export class ChurchSlideshowViewComponent {
  active = inject(ActiveChurchSlideshowService);
}