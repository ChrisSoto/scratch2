import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../user/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'common-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './common-toolbar.component.html',
  styleUrls: ['./common-toolbar.component.scss']
})
export class CommonToolbarComponent {
  titleService = inject(Title);
  private auth = inject(AuthService);
  isAuthenticated$ = inject(AuthService).isAuthenticated$;
  router = inject(Router);
  snack = inject(MatSnackBar);

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.snack.open('You are logged out!', '', { duration: 3000 });
      });
  }
}
