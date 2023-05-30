import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./shared/user/login/login.component').then(mod => mod.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./shared/user/register/register.component').then(mod => mod.RegisterComponent),
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
