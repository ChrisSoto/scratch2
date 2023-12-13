import { Injectable, signal } from '@angular/core';
import { PSystem } from '../model/models.interface';

@Injectable()
export class PatternActiveSystemService {

  public system = signal<PSystem | null>(null);

  setActive(system: PSystem) {
    this.system.set(system);
  }

  clear() {
    this.system.set(null);
  }

  orderParts(): void {
    const system = this.system() as PSystem;
    const parts = system.parts;
    if (parts.length) {
      parts.forEach((part, index) => {
        part.order = index + 1;
      });
    }
  }

  nextPartIndex(): number {
    const system = this.system() as PSystem;
    return system.parts.length + 1;
  }

}
