import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProjectStepper } from '../project-stepper/project-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PortfolioProject } from '../../services/portfolio-project.service';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { PortfolioNavService } from '../../services/project-navigation.service';

type PortfolioDialog = {
  project: PortfolioProject;
  page: number;
};

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ProjectStepper,
    ProjectViewerComponent,
  ],
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {
  dialogRef = inject(DialogRef);
  data: PortfolioDialog = inject(MAT_DIALOG_DATA);
}
