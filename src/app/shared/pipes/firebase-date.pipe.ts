import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'firebaseDate',
  standalone: true
})
export class FirebaseDatePipe implements PipeTransform {

  // not sure if there is a standard solution to this, but if you want to make optimistic updates
  // firebase Timestamp gets converted to something that notifies firebase server to update the date (_methodName)
  // and you can't display the time until after it's been sent to the server and back again.
  transform(date: Timestamp): string | number | Date {
    if (date) {
      if ('toDate' in date) {
        return date.toDate();
      } else if ('_methodName' in date) {
        return Timestamp.now().toDate();
      } else {
        return 'fb date pipe error';
      }
    } else {
      return 'fb date pipe error';
    }
  }

}
