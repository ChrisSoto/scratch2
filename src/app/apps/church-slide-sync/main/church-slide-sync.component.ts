import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ChurchSlideshowViewComponent } from '../components/church-slideshow-view/church-slideshow-view.component';
import { RouterModule } from '@angular/router';
import { ActiveChurchSlideshowService } from '../services/active-church-slideshow.service';
import { ChurchSlideshowService } from '../services/church-slideshow.service';
import { ChurchSlideService } from '../services/church-slide.service';
import { SlideshowControlsService } from '../services/slideshow-controls.service';

@Component({
  selector: 'app-church-slide-sync',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChurchSlideshowViewComponent,
  ],
  providers: [
    ChurchSlideshowService,
    ActiveChurchSlideshowService,
    ChurchSlideService,
    SlideshowControlsService,
  ],
  templateUrl: './church-slide-sync.component.html',
  styleUrls: ['./church-slide-sync.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyDown($event)'
  }
})
export class ChurchSlideSyncComponent {

  private screenHeight = inject(ScreenHeightService);
  controls = inject(SlideshowControlsService);

  viewMode = signal(false);

  constructor() {
    this.screenHeight.setFull();
  }

  handleKeyDown(event: KeyboardEvent) {
    this.controls.keyDown(event);
  };
}
