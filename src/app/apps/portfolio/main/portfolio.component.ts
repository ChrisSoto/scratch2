import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ProjectGridComponent } from '../components/project-grid/project-grid.component';
import { RouterModule } from '@angular/router';
import { PortfolioProjectService } from '../services/portfolio-project.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    ProjectGridComponent,
    RouterModule,
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  screenHeight = inject(ScreenHeightService);
  projects$ = inject(PortfolioProjectService).projects$;

  constructor() {
    this.screenHeight.setFullScreen(true);
  }
}
