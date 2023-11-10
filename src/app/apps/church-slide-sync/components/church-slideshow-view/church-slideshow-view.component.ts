import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { MakeSquareDirective } from '../../directives/make-square.directive';
import { HymnVerseComponent } from '../hymn-verse/hymn-verse.component';
import { ActiveHymnService } from '../../services/active-hymn.service';

@Component({
  selector: 'church-slideshow-view',
  standalone: true,
  imports: [
    CommonModule,
    MakeSquareDirective,
    HymnVerseComponent,
  ],
  providers: [
    ActiveHymnService
  ],
  templateUrl: './church-slideshow-view.component.html',
  styleUrls: ['./church-slideshow-view.component.scss']
})
export class ChurchSlideshowViewComponent {
  active = inject(ActiveChurchSlideshowService);
  hymn = inject(ActiveHymnService);

  ngOnInit() {
    this.hymn.update();
  }
}
