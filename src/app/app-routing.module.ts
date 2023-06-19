import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteGuard } from './shared/user/route.guard';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
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
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(UserRouteGuard).canActivate(route, state)
    ],
    children: [
      {
        path: 'church-slide-sync',
        title: 'Church Slide Sync',
        loadChildren: () => import('./apps/church-slide-sync/church-slide-sync.routing').then(r => r.ChurchListRoutes)
      },
      {
        path: 'portfolio',
        title: 'Chris Grimm\'s Portfolio',
        loadChildren: () => import('./apps/portfolio/portfolio.routing').then(r => r.PortfolioRouting)
      },
      {
        path: 'weldmac',
        title: 'WELDMAC - Roll Weld',
        loadChildren: () => import('./apps/weldmac/weldmac.routing').then(r => r.WeldmacRouting)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
