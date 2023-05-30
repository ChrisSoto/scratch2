import { Component } from '@angular/core';
import { ScreenHeightService } from './shared/services/screen-height.service';
import { UserService } from './shared/user/user.service';
import { AuthService } from './shared/user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public screenHeight: ScreenHeightService,
    public auth: AuthService) { }
}
