import { Injectable, signal } from '@angular/core';
import { PData, PPart, PSystem } from '../model/models.interface';

@Injectable()
export class PatternActiveSystemService {

  public system = signal<PSystem | null>(null);
  public parts = signal<PPart[]>([]);
  // handle patternData here or in another service to track changes and update the view
  public patternData = signal<PData[]>([]);

  setActive(system: PSystem) {
    this.system.set(system);
  }

  clear() {
    this.system.set(null);
    this.parts.set([]);
  }

  setActiveParts(part: PPart | PPart[]) {
    const parts = this.parts();
    if (Array.isArray(part)) {
      for (let i = 0; i < part.length; i++) {
        this.setActiveParts(part[i]);
      }
    } else {
      if (!parts.includes(part)) {
        parts.push(part);
        this.parts.set(parts);
      }
    }
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
