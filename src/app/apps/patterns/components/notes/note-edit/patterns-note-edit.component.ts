import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ActiveSystemService } from '../../../services/active-system.service';
import { PatternNotesService } from '../../../services/pattern-notes.service';
import { PSystem } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { NotesSystemPartComponent } from '../notes-system-part/notes-system-part.component';
import { SystemPartService } from '../../../services/system-part.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'patterns-note-edit',
  standalone: true,
  imports: [
    CommonModule,
    NotesSystemPartComponent,
    MatDialogModule,
  ],
  providers: [
    ActiveSystemService,
    PatternNotesService,
    SystemPartService,
  ],
  templateUrl: './patterns-note-edit.component.html',
  styleUrls: ['./patterns-note-edit.component.scss']
})
export class PatternsNoteEditComponent {

  public active = inject(ActiveSystemService);
  public route = inject(ActivatedRoute);
  private notesService = inject(PatternNotesService);

  constructor() {
    this.route.params
      .pipe(
        switchMap(params => this.notesService.read(params['id']))
      )
      .subscribe(system => {
        this.active.setActive(system.data() as PSystem);
      })
  }
}
