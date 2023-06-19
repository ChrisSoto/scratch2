import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevelopmentService {

  breakPointsClass = "bg-red-100 sm:bg-orange-100 md:bg-yellow-100 lg:bg-green-100 xl:bg-blue-100 2xl:bg-indigo-100";
  readonly breakPoints = signal('');

  setBreakPoints(value: boolean) {
    this.breakPoints.update(() => {
      return value ? this.breakPointsClass : '';
    });
  }

}
