import { Routes } from '@angular/router';

export const LifeRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./life-home/life-home.component').then(c => c.LifeHomeComponent),
    children: [
      {
        path: 'login',
        title: 'Life Game: Login',
        loadComponent: () => import('./life-login/life-login.component').then(c => c.LifeLoginComponent),
      }
    ]
  }
];