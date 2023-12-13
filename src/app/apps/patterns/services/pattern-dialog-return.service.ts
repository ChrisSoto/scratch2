import { Injectable } from '@angular/core';
import { DialogReturn } from '../model/models.interface';

@Injectable()
export class PatternDialogReturnService {

  status<T>(value: DialogReturn<T>): Promise<DialogReturn<T>> {
    return new Promise(resolve => {
      if (value.data) {
        resolve(value);
      } else {
        resolve({ status: value.status, data: null });
      }
    });
  }

  // move this to a dialogReturn service
  null<T>(): Promise<DialogReturn<T>> {
    return new Promise((resolve) => resolve({ status: 'cancel', data: null }))
  }
}
