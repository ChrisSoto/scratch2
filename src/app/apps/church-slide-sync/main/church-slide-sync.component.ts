import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ChurchSlidesViewComponent } from '../view/church-slides-view/church-slides-view.component';
import { ChurchSlidesPreviewComponent } from '../view/church-slides-preview/church-slides-preview.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-church-slide-sync',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChurchSlidesViewComponent,
    ChurchSlidesPreviewComponent,
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
