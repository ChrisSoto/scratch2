import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioProjectService } from './portfolio-project.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PortfolioNavService {

  private projectService = inject(PortfolioProjectService);
  private router = inject(Router);
  private home = 'portfolio';

  selectedIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  goTo(projectSlug: string, page?: number) {
    if (page) {
      this.router.navigate([this.home + '/' + projectSlug + '/' + page]);
    } else {
      this.router.navigate([this.home + '/' + projectSlug + '/' + '1']);
    }
  }

  load(projectSlug: string, page: number) {
    this.selectedIndex$.next(page - 1);
    this.projectService.setProject(projectSlug);
  }
}
