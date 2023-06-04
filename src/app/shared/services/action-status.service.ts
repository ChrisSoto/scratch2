import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActionStatusComponent } from '../components/action-status/action-status.component';

@Injectable({
  providedIn: 'root'
})
export class ActionStatusService {
  snackbar = inject(MatSnackBar);

  success(message: string) {
    this.snackbar.openFromComponent(
      ActionStatusComponent,
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: {
          message: message,
          success: true,
        }
      });
  }

  failure(message: string) {
    this.snackbar.openFromComponent(
      ActionStatusComponent,
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: {
          message: message,
          success: false
        }
      });
  }
}
