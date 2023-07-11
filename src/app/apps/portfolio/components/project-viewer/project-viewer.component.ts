import { Component, HostListener, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProjectService, ProjectPage } from '../../services/portfolio-project.service';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { PortfolioNavService } from '../../services/project-navigation.service';
import { TextAreaEditorComponent } from 'src/app/shared/components/text-area-editor/text-area-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxMarkdownTailwindService } from 'src/app/shared/services/ngx-markdown-tailwind.service';

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

  edit() {
    this.editMode.set(true);
  }

  save(text: string) {
    console.log(text);
    this.editMode.set(false);
    const index = this.nav.selectedIndex$.value;
    this.projectService.savePageTextEdit(index, text);
  }

  cancel() {
    this.editMode.set(false);
  }











}
