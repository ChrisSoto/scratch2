import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface PortfolioProject {
  name: string;
  link: string;
}

@Injectable()
export class PortfolioProjectService {

  projects$: BehaviorSubject<PortfolioProject[]> = new BehaviorSubject<PortfolioProject[]>([]);

  constructor() {
    this.projects$.next(
      [
        {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        }, {
          name: 'Workforms',
          link: 'projects/workforms'
        },
      ]
    );
  }
}
