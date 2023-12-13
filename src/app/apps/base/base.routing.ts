import { Routes } from '@angular/router';

export const BaseRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./base-home/base-home.component').then(c => c.BaseHomeComponent),
    children: []
  }
];