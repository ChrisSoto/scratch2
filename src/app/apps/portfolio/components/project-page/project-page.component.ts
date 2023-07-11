import { Component, HostListener, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStepper } from '../project-stepper/project-stepper.component';
import { PortfolioNavService } from '../../services/project-navigation.service';
import { PortfolioProjectService, ProjectPage } from '../../services/portfolio-project.service';
import { ProjectViewerComponent } from '../project-viewer/project-viewer.component';
import { BehaviorSubject, combineLatest, mergeAll, mergeMap, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';
import { TextAreaEditorComponent } from 'src/app/shared/components/text-area-editor/text-area-editor.component';
import { Router } from '@angular/router';

function toNumber(value: string | number): number {
  return +value;
}

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [
    CommonModule,
    ProjectStepper,
    ProjectViewerComponent,
    MatButtonModule,
    MarkdownModule,
    TextAreaEditorComponent,
  ],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent {
  @Input() project!: string;
  @Input({ transform: toNumber }) page!: number;
  @HostListener('window:scroll', ['$event'])
  scrollCheck() {
  //  let wait = true;
  //  setTimeout(() => {
  //    const currentOffset = window.pageYOffset;
  //    if (currentOffset > 0) {
  //      this.showSummary.set(false);
  //    } else {
  //      this.showSummary.set(true);
  //    }
  //    wait = false;
  //  }, 1000)
  }

  showSummary = signal(true);

  router = inject(Router);

  nav = inject(PortfolioNavService);
  project$ = inject(PortfolioProjectService).active$;
  projectService = inject(PortfolioProjectService);

  projectPage$: BehaviorSubject<ProjectPage | null> = new BehaviorSubject<ProjectPage | null>(null)

  ngOnInit() {
    this.nav.load(this.project, this.page);
    combineLatest(this.nav.selectedIndex$.asObservable(), this.project$.asObservable())
      .subscribe((data) => {
        const index = data[0];
        const project = data[1];
        if (index > -1 && project) {
          this.projectPage$.next(project.pages[index]);
        }
      })
  }

  save(text: string) {
    this.projectService.saveDescriptionEdit(text);
  }

  onStepChange(index: number) {
    const project = this.project$.value;
    if (project && index > -1) {
      this.nav.goTo(project.slug, index + 1);
    }
  }

  goHome() {
    this.router.navigate(['portfolio']);
  }
}
