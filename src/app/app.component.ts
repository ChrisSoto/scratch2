import { Component, inject } from '@angular/core';
import { ScreenHeightService } from './shared/services/screen-height.service';
import { AuthService } from './shared/user/auth.service';
import { ToolbarService } from './shared/services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public screenHeight = inject(ScreenHeightService);
  public toolbar = inject(ToolbarService);
  public auth = inject(AuthService);

  constructor() { }

}
