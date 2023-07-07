import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProject, PortfolioProjectService } from '../../services/portfolio-project.service';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectSummaryComponent } from '../project-summary/project-summary.component';

@Component({
  selector: 'project-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ProjectSummaryComponent,
  ],
  providers: [
    PortfolioProjectService
  ],
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss']
})
export class ProjectGridComponent {
  projects$ = inject(PortfolioProjectService).projects$;
  dialog = inject(MatDialog);

  openProject(project: PortfolioProject): void {
    this.dialog.open(ProjectDialogComponent, {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      data: project
    })
    .afterClosed()
    .subscribe(() => {
      console.log('closed');
    });
  }
}
