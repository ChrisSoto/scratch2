import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Material {
  type: string;
  thickness: number;
}

export interface MaterialStack {
  top: Material,
  mid?: Material,
  bot: Material,
}

export interface WeldmacPart {
  number: string;
  company: string;
  operations: MaterialStack[],
  description?: string;
}

@Injectable()
export class WeldmacPartService {

  parts$ = new BehaviorSubject<WeldmacPart[]>([])

  constructor() {
    this.parts$.next([
      {
        number: '180192-302',
        company: 'Solar',
        operations: [{
          top: {
            type: '321',
            thickness: 0.090,
          },
          bot: {
            type: '321',
            thickness: 0.090
          }
        }]
      },
      {
        number: '206477-101',
        company: 'Solar',
        operations: [
          {
            top: {
              type: '409',
              thickness: 0.060,
            },
            bot: {
              type: '409',
              thickness: 0.060
            }
          },
          {
            top: {
              type: '409',
              thickness: 0.030,
            },
            bot: {
              type: '409',
              thickness: 0.060
            }
          }
        ]
      },
      {
        number: '204114-C-109',
        company: 'Solar',
        operations: [{
          top: {
            type: '321',
            thickness: 0.090,
          },
          bot: {
            type: '321',
            thickness: 0.120
          }
        }]
      },
      {
        number: '180192-921',
        company: 'Solar',
        operations: [{
          top: {
            type: '321',
            thickness: 0.20,
          },
          bot: {
            type: '321',
            thickness: 0.20
          }
        }]
      },
      {
        number: '362430-913',
        company: 'Solar',
        operations: [{
          top: {
            type: '321',
            thickness: 0.090,
          },
          bot: {
            type: '321',
            thickness: 0.060
          }
        }]
      },
      {
        number: '243074-906',
        company: 'Solar',
        operations: [{
          top: {
            type: '321',
            thickness: 0.120,
          },
          bot: {
            type: '321',
            thickness: 0.090
          }
        }]
      },
      {
        number: '115808',
        company: 'Solar',
        operations: [{
          top: {
            type: '321',
            thickness: 0.090,
          },
          bot: {
            type: '321',
            thickness: 0.090
          }
        }]
      }
    ])
  }
}
