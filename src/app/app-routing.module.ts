import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/user/auth.service';

const routes: Routes = [
  {
    path: '',
    title: 'Home: Under Construction',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./shared/user/login/login.component').then(c => c.LoginComponent),

  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./shared/user/register/register.component').then(c => c.RegisterComponent),

  },
  //
  //
  // protected routes
  //
  {
    path: '',
    canActivate: [
      () => inject(AuthService).isAuthenticated$
    ],
    children: [
      {
        path: 'church-slide-sync',
        title: 'Church Slide Sync',
        loadChildren: () => import('./apps/church-slide-sync/church-slide-sync.routing').then(r => r.ChurchListRoutes)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
