import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ChurchSlideshowViewComponent } from '../components/church-slideshow-view/church-slideshow-view.component';
import { RouterModule } from '@angular/router';
import { ActiveChurchSlideshowService } from '../services/active-church-slideshow.service';
import { ChurchSlideshowService } from '../services/church-slideshow.service';
import { ChurchSlideService } from '../services/church-slide.service';

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
  ],
  templateUrl: './church-slide-sync.component.html',
  styleUrls: ['./church-slide-sync.component.scss']
})
export class ChurchSlideSyncComponent {

  private screenHeight = inject(ScreenHeightService);

  viewMode = signal(false);

  constructor() {
    this.screenHeight.setFull();
  }
}
