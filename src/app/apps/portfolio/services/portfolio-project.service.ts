import { Injectable, inject } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { BehaviorSubject, filter, take } from 'rxjs';
import { Meta } from 'src/app/shared/interface/meta.model';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-ref.service';

export interface PortfolioProject extends Meta {
  name: string;
  order: number;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  pages: ProjectPage[];
}

export interface ProjectPage {
  text: string;
  order: number;
}


@Injectable()
export class PortfolioProjectService {

  path = 'portfolio';

  ls = inject(LocalStorageService);
  database = inject(DatabaseService);
  projects$: BehaviorSubject<PortfolioProject[]> = new BehaviorSubject<PortfolioProject[]>([]);
  active$: BehaviorSubject<PortfolioProject | null> = new BehaviorSubject<PortfolioProject | null>(null);

  constructor() {

    if (this.olderThanADay()) {
      this.load();
    } else {
      const projects = this.ls.getLocalStorage<PortfolioProject[]>('--projects');
      if (!projects) {
        this.load()
      } else {
        this.projects$.next(projects);
      }
    }
  }

  addSlide(idx: number, text: string) {
    const project = this.active$.value;
    if (project) {
      project.pages.splice(idx, 0, { text, order: idx });
      this.database.update(this.path + '/' + project.id, project);
    }
  }

  savePageTextEdit(idx: number, text: string) {
    const project = this.active$.value;
    if (project?.pages.length) {
      project.pages[idx].text = text;
      this.database.update(this.path + '/' + project.id, project);
    }
  }

  saveDescriptionEdit(text: string) {
    const project = this.active$.value;
    if (project) {
      project.description = text;
      this.database.update(this.path + '/' + project.id, project);
    }
  }

  setProject(slug: string): void {
    this.projects$
      .pipe(
        filter(p => p.length > 0)
      )
      .subscribe(projects => {
        const project = projects.find(p => p.slug === slug) as PortfolioProject;
        this.active$.next(project);
      });
  }

  private load() {
    this.database.list<PortfolioProject>(this.path, orderBy('order', 'asc'))
    .subscribe(data => {
      this.ls.setLocalStorage('--projects', data);
      this.ls.setLocalStorage('--projectsLoadedOn', new Date().getTime());
      this.projects$.next(data);
    });
  }

  private olderThanADay(): boolean {
    const lastLoad = this.ls.getLocalStorage<number>("--projectsLoadedOn");
    if (lastLoad) {
      const age = new Date().getTime() - lastLoad;
      return age > 10000;
      // return age > 86400000;
    }

    return true;
  }

  private uploadProjects() {
    const projects = this.projects$.value;
    if (!projects) return;
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      this.database.add(this.path, project);
    }
  }
}


