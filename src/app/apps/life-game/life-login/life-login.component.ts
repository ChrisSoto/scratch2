import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopmentService } from 'src/app/shared/services/development.service';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';

@Component({
  selector: 'app-life-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './life-login.component.html',
  styleUrls: ['./life-login.component.scss']
})
export class LifeLoginComponent {
  dev = inject(DevelopmentService);
  screenHeight = inject(ScreenHeightService);

  constructor() {
    // this.dev.setBreakPoints(true);
    // this.screenHeight.setFullScreen(true);
  }

}
