import { Routes } from '@angular/router';

export const PortfolioRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/portfolio.component')
      .then(c => c.PortfolioComponent),
  },
  {
    path: ':project/:page',
    loadComponent: () => import('./components/project-page/project-page.component')
      .then(c => c.ProjectPageComponent)
  },
];


