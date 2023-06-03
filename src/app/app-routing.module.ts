import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./shared/user/login/login.component').then(c => c.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./shared/user/register/register.component').then(c => c.RegisterComponent),
    title: 'Register'
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    title: 'Home: Under Construction'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
