import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteGuard } from './shared/user/route.guard';

import { PortfolioProjectService } from './apps/portfolio/services/portfolio-project.service';
import { PortfolioNavService } from './apps/portfolio/services/project-navigation.service';
import { AuthService } from './shared/user/auth.service';
import { UserService } from './shared/user/user.service';

export const AppRoutes: Routes = [
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
  {
    path: 'portfolio',
    title: 'Chris Grimm\'s Portfolio',
    loadChildren: () => import('./apps/portfolio/portfolio.routing').then(r => r.PortfolioRouting),
    providers: [
      PortfolioProjectService,
      PortfolioNavService,
    ],
  },
  //
  //
  // protected routes
  //
  {
    path: '',
    providers: [
      AuthService
    ],
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
        path: 'weldmac',
        title: 'WELDMAC - Roll Weld',
        loadChildren: () => import('./apps/weldmac/weldmac.routing').then(r => r.WeldmacRouting)
      },
      {
        path: 'patterns',
        title: 'Pattern Program',
        loadChildren: () => import('./apps/patterns/patterns-routing').then(r => r.PatternsRouting)
      },
      {
        path: 'life',
        title: 'Life Game',
        loadChildren: () => import('./apps/life-game/life.routing').then(r => r.LifeRouting)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
