import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ProjectGridComponent } from '../components/project-grid/project-grid.component';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    ProjectGridComponent,
    DialogModule,
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  screenHeight = inject(ScreenHeightService);

  constructor() {
    this.screenHeight.setFullScreen(true);
  }
}
