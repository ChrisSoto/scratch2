import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProjectService } from '../../services/portfolio-project.service';

@Component({
  selector: 'portfolio-grid',
  standalone: true,
  imports: [CommonModule],
  providers: [
    PortfolioProjectService
  ],
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.scss']
})
export class PortfolioGridComponent {
  projects$ = inject(PortfolioProjectService).projects$;
}
