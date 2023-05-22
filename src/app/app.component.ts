import { Component } from '@angular/core';
import { ScreenHeightService } from './root-services/screen-height.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public screenHeight: ScreenHeightService) { }
}
