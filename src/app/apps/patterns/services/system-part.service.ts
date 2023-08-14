import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PPart, PSystem } from '../model/models.interface';

@Injectable()
export class SystemPartService {

  constructor() { }

  newPart(system: PSystem): Partial<PPart> {
    return {
      name: '',
      description: '',
      generatorIds: [system.id]
    };
  }

}
