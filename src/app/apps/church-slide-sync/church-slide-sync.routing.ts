import { Routes } from '@angular/router';

export const ChurchListRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/church-slide-sync.component').then(c => c.ChurchSlideSyncComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/church-slide-list/church-slide-list.component')
          .then(c => c.ChurchSlideListComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/church-slide-edit/church-slide-edit.component')
          .then(c => c.ChurchSlideEditComponent)
      }
    ]
  }
];


