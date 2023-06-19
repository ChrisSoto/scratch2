import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { PortfolioGridComponent } from '../components/portfolio-grid/portfolio-grid.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    PortfolioGridComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  screenHeight = inject(ScreenHeightService);

  constructor() {
    this.screenHeight.setFull();
  }
}
