import { Component, inject } from '@angular/core';
import { CommonModule, provideImageKitLoader } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { ProjectGridComponent } from '../components/project-grid/project-grid.component';
import { RouterModule } from '@angular/router';
import { PortfolioProjectService } from '../services/portfolio-project.service';
import { BackgroundService } from 'src/app/shared/services/background.service';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

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
  bg = inject(BackgroundService);

  backgroundColor = 'bg-slate-800';

  constructor() {
    this.bg.setBackgroundClass(this.backgroundColor);
    this.screenHeight.setFullScreen(true);
  }

  ngOnDestroy() {
    // this.bg.removeBackgroundClass(this.backgroundColor);
  }
}
