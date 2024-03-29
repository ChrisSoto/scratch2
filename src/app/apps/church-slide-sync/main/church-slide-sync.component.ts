import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ChurchSlideshowViewComponent } from '../components/church-slideshow-view/church-slideshow-view.component';
import { ActiveChurchSlideshowService } from '../services/active-church-slideshow.service';
import { ChurchSlideshowService } from '../services/church-slideshow.service';
import { ChurchSlideService } from '../services/church-slide.service';
import { SlideshowControlsService } from '../services/slideshow-controls.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { EditHymnComponent } from '../dialogs/edit-hymn/edit-hymn.component';
import { ChurchMobileControlsComponent } from '../components/church-mobile-controls/church-mobile-controls.component';

@Component({
  selector: 'app-church-slide-sync',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChurchSlideshowViewComponent,
    ChurchMobileControlsComponent,
  ],
  providers: [
    ChurchSlideshowService,
    ActiveChurchSlideshowService,
    ChurchSlideService,
    SlideshowControlsService,
    FileUploadService
  ],
  templateUrl: './church-slide-sync.component.html',
  styleUrls: ['./church-slide-sync.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyDown($event)'
  }
})
export class ChurchSlideSyncComponent {

  private screenHeight = inject(ScreenHeightService);
  active = inject(ActiveChurchSlideshowService);
  controls = inject(SlideshowControlsService);
  viewMode = signal(false);

  constructor() {
    this.screenHeight.setFullScreen(true);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.controls.keyDown(event);
  };
}
