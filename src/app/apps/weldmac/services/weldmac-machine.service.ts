import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WeldmacResistanceWeldMachine {
  brand: string;
  power: number;
  serial: string;
}

@Injectable()
export class WeldmacMachineService {

  machines$: BehaviorSubject<WeldmacResistanceWeldMachine[]> = new BehaviorSubject<WeldmacResistanceWeldMachine[]>([]);

  constructor() {
    this.machines$.next([
      {
        brand: 'Sciaky',
        power: 125,
        serial: '8996R'
      },
      {
        brand: 'Sciaky',
        power: 150,
        serial: '8995R'
      },
    ])
  }
}
