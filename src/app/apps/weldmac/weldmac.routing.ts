import { Routes } from '@angular/router';

export const WeldmacRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/weldmac.component').then(c => c.WeldmacComponent),
    children: [
      // {
      //   path: '',
      //   loadComponent: () => import('./components/church-slide-list/church-slide-list.component')
      //     .then(c => c.ChurchSlideListComponent)
      // },
      // {
      //   path: 'edit/:id',
      //   loadComponent: () => import('./components/church-slide-edit/church-slide-edit.component')
      //     .then(c => c.ChurchSlideEditComponent)
      // }
    ]
  }
];


