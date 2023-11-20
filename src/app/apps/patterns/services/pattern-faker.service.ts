import { Injectable } from '@angular/core';
import { SystemService } from './system.service';
import { PPart } from '../model/models.interface';

@Injectable()
export class PatternFakerService {

  constructor(private systemService: SystemService) { }

  createSystems(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.systemService.create({
        name: 'Fake System' + i,
        description: 'Fake description.',
        parts: this.createParts()
      });
    }
  }

  createParts(): PPart[] {
    let parts: PPart[] = [];
    let random = this.getRandomInt(1, 11);
    for (let i = 0; i < random; i++) {
      parts.push({
        id: '',
        name: 'Part Name' + i,
        description: 'Part Description',
        generatorIds: []
      });
    }
    return parts;
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

}
