import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { DialogReturn, PPart } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatternsPartEditComponent } from '../part-edit/patterns-part-edit.component';
import { switchMap } from 'rxjs';
import { PatternsPartNoteEditComponent } from '../part-note-edit/patterns-part-note-edit.component';
import { PatternEditPartService } from '../../../services/pattern-edit-part.service';
import { PatternPartService } from '../../../services/pattern-part.service';
import { MatButtonModule } from '@angular/material/button';
import { PatternsPartCompareComponent } from '../part-compare/part-compare.component';

@Component({
  selector: 'patterns-part-view',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
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
  @Input() edit = false;
  @Input() isLast!: boolean;
  @Input() index!: number;

  @Output() removeChange = new EventEmitter<number>();

  private dialog = inject(MatDialog);
  private partEditService = inject(PatternEditPartService);
  private partService = inject(PatternPartService);

  latestPart = signal<PPart | null>(null);
  canUpdate = signal(false);
  original = signal(false);

  constructor() {
    
  }

  ngOnInit() {
    if (this.edit) {
      this.partService.read(this.part.id)
        .then(res => {
          if(res.exists()) {
            this.latestPart.set(res.data() as PPart);
            this.checkForUpdate()
          }
        });
    }
  }

  compareParts() {
    this.dialog.open(PatternsPartCompareComponent, { data: { newPart: this.latestPart(), oldPart: this.part }, width: '50%' })
      .afterClosed()
      .pipe(
        switchMap((value) => this.partEditService.edit(value))
      )
      .subscribe(res => console.log(res));
  }

  private checkForUpdate() {
    const latest = this.latestPart();
    if (latest) {
      if (latest.updated && this.part.updated) {
        const timeA = latest.updated.toMillis();
        const timeB = this.part.updated.toMillis();
        this.canUpdate.set(timeA > timeB);
      }
    }
  }

  addNote() {
    this.dialog.open(PatternsPartNoteEditComponent, { data: this.part })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => this.partEditService.edit(value))
      )
      .subscribe(value => {
        console.log(value);
      })
  }

  editPart() {
    this.dialog.open(PatternsPartEditComponent, { data: this.part })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => this.partEditService.edit(value))
      )
      .subscribe(value => {
        console.log(value);
      })
  }

}
