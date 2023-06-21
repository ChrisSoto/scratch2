import { Component, inject } from '@angular/core';
import { DevelopmentService } from 'src/app/shared/services/development.service';
import { ScreenHeightService } from 'src/app/shared/services/screen-height.service';
import { RouterModule } from '@angular/router';
import { WeldmacTestRegisterService } from '../services/weldmac-test-register.service';
import { WeldmacActiveTestRegisterService } from '../services/weldmac-active-test-register.service';

@Component({
  selector: 'app-weldmac',
  standalone: true,
  imports: [
    RouterModule,
  ],
  providers: [
    WeldmacActiveTestRegisterService,
    WeldmacTestRegisterService,
  ],
  templateUrl: './weldmac.component.html',
  styleUrls: ['./weldmac.component.scss']
})
export class WeldmacComponent {
  dev = inject(DevelopmentService);
  screenHeight = inject(ScreenHeightService);

  constructor() {
    this.dev.setBreakPoints(true);
    this.screenHeight.setFullScreen(true);
  }
}
