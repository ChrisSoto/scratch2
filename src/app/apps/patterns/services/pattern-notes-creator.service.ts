import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PSystem } from '../model/models.interface';
import { PatternNotesService } from './pattern-notes.service';
import { SystemService } from './system.service';

@Injectable()
export class PatternNotesCreatorService {

  private systemService = inject(SystemService);
  private notesService = inject(PatternNotesService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  create(patternId: string) {
    // get the pattern by ID
    this.systemService.read(patternId)
      .then(res => {
        const system = res.data() as Partial<PSystem>;
        delete system.id;
        delete system.created;
        delete system.createdBy;
        delete system.updated;
        delete system.updatedBy;
        system.systemId = patternId;
        return this.notesService.create(system);
      })
      .then((res) => {
        return this.router.navigate(['patterns/notes/' + res.id]);
      })
      .then(() => {
        this.snack.open('Note System Created!', undefined, { duration: 3000 });
      });
  }
}
