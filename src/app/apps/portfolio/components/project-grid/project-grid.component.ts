import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProject } from '../../services/portfolio-project.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectSummaryComponent } from '../project-summary/project-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'project-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ProjectSummaryComponent,
  ],
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss']
})
export class ProjectGridComponent {
  @Input() projects!: PortfolioProject[] | null;

  router = inject(Router);

  openProject(project: PortfolioProject): void {
    this.router.navigate(['portfolio/' + project.slug + '/' + '1']);
  }
}
