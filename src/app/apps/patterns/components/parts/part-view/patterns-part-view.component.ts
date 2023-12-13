import { Component, Input, inject, signal } from '@angular/core';
import { DialogReturn, PPart } from '../../../model/models.interface';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatternsPartEditComponent } from '../part-edit/patterns-part-edit.component';
import { switchMap } from 'rxjs';
import { PatternsPartNoteEditComponent } from '../part-note-edit/patterns-part-note-edit.component';
import { PatternEditPartService } from '../../../services/pattern-edit-part.service';

@Component({
  selector: 'patterns-part-view',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './patterns-part-view.component.html',
  styleUrls: ['./patterns-part-view.component.scss']
})
export class PatternsPartViewComponent {
  @Input() id!: string;
  @Input() part!: PPart;
  @Input() isLast!: boolean;
  @Input() index!: number;

  private dialog = inject(MatDialog);
  private partService = inject(PatternEditPartService);

  original = signal(false);

  addNote() {
    this.dialog.open(PatternsPartNoteEditComponent, { data: this.part })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => this.partService.edit(value))
      )
      .subscribe(value => {
        console.log(value);
      })
  }

  editPart() {
    this.dialog.open(PatternsPartEditComponent, { data: this.part })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => this.partService.edit(value))
      )
      .subscribe(value => {
        console.log(value);
      })
  }

}
