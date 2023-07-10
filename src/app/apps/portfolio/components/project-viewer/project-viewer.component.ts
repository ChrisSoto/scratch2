import { Component, HostListener, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProjectService, ProjectPage } from '../../services/portfolio-project.service';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { PortfolioNavService } from '../../services/project-navigation.service';
import { TextAreaEditorComponent } from 'src/app/shared/components/text-area-editor/text-area-editor.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'project-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    TextAreaEditorComponent,
    MatButtonModule,
  ],
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.scss']
})
export class ProjectViewerComponent {
  @Input() projectPage!: ProjectPage | null;


  projectService = inject(PortfolioProjectService);
  nav = inject(PortfolioNavService);

  editMode = signal(false);

  ngOnInit() {
    this.markdownRender();
  }

  edit() {
    this.editMode.set(true);
  }

  save(text: string) {
    console.log(text);
    this.editMode.set(false);
    const index = this.nav.selectedIndex$.value;
    this.projectService.saveProjectEdit(index, text);
  }

  cancel() {
    this.editMode.set(false);
  }











  // moving to service at some point
  mkRender = inject(MarkdownService);

  markdownRender() {
    this.mkRender.renderer.heading = (text, level) => {
      return '<h'+ level + ' class="' + this.setHeaderLevels(level) + '">' + text + '</h' + level + '>';
    }
  }

  setHeaderLevels(level: number): string {
    let headerClass = '';
    switch (level) {
      case 1:
        headerClass = 'text-4xl font-bold tracking-wide text-slate-800 pb-4';
        break;

      case 2:
        headerClass = 'text-3xl font-light tracking-wide text-slate-950 pb-4';
        break;

      case 3:
        headerClass = 'text-2xl font-bold tracking-wide text-slate-700 pb-2';
        break;

      case 4:
        headerClass = 'text-2xl font-light tracking-wide text-slate-900 pb-2';
        break;

      case 5:
        headerClass = 'text-xl font-bold tracking-wide text-slate-800 pb-1';
        break;

      case 6:
        headerClass = 'text-lg font-light italic tracking-wide text-slate-950 pb-1';
        break;
    }
    return headerClass;
  }
}
