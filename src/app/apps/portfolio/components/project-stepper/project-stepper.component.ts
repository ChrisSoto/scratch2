import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CdkStepperModule, CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'project-stepper',
  standalone: true,
  imports: [NgTemplateOutlet, CdkStepperModule, CommonModule],
  providers: [{provide: CdkStepper, useExisting: ProjectStepper}],
  templateUrl: './project-stepper.component.html',
  styleUrls: ['./project-stepper.component.scss']
})
export class ProjectStepper extends CdkStepper {
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
