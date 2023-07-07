import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProjectStepper } from '../project-stepper/project-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PortfolioProject } from '../../services/portfolio-project.service';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ProjectStepper,
    CdkStepperModule,
  ],
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {
  dialogRef = inject(DialogRef);
  project: PortfolioProject = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    console.log(this.project);
  }
}
