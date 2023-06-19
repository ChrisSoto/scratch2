import { Routes } from '@angular/router';

export const PortfolioRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/portfolio.component').then(c => c.PortfolioComponent),
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


