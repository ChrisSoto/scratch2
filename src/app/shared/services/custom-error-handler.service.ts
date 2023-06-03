import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snack: MatSnackBar) { }

  handleError(error: unknown): void {
    this.snack.open(error as string, 'close');
    console.warn(error)
  }
}
