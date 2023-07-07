import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProject } from '../../services/portfolio-project.service';

@Component({
  selector: 'project-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent {
  @Input() project!: PortfolioProject;
}
