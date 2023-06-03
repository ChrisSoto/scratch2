import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(
    private snack: MatSnackBar,
    private zone: NgZone) { }

  handleError(error: unknown): void {
    this.zone.run(() => {
      this.snack.open(error as string, 'close');
    });

    console.warn(error)
  }
}
