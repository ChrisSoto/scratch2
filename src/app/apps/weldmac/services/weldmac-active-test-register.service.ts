import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WeldmacResistanceWeldMachine } from './weldmac-machine.service';
import { WeldmacPart } from './weldmac-part.service';

@Injectable()
export class WeldmacActiveTestRegisterService {

  machine$: BehaviorSubject<WeldmacResistanceWeldMachine | null> = new BehaviorSubject<WeldmacResistanceWeldMachine | null>(null);
  part$: BehaviorSubject<WeldmacPart | null> = new BehaviorSubject<WeldmacPart | null>(null);

  setMachine(machine: WeldmacResistanceWeldMachine) {
    this.machine$.next(machine);
  }

  setPart(part: WeldmacPart) {
    this.part$.next(part);
  }
}
