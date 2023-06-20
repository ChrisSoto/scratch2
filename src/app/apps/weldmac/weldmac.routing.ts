import { Routes } from '@angular/router';

export const WeldmacRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/weldmac.component').then(c => c.WeldmacComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/create-register-by-part-number/create-register-by-part-number.component')
          .then(p => p.CreateRegisterByPartNumberComponent)
      },
      {
        path: 'register/:id',
        loadComponent: () => import('./pages/test-register/test-register.component')
          .then(p => p.TestRegisterComponent)
      }
    ]
  }
];


