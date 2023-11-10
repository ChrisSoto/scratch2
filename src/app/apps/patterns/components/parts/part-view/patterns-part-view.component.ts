import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { PPart } from '../../../model/models.interface';
import { ActiveSystemService } from '../../../services/active-system.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PatternsPartEditComponent } from '../part-edit/patterns-part-edit.component';

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
  @Input() part!: PPart;
  @Input() isLast!: boolean;
  @Input() index!: number;

  private dialog = inject(MatDialog);

  partDialogRef!: MatDialogRef<PatternsPartEditComponent>;

  editPart(part: PPart, index: number) {
    this.partDialogRef = this.dialog.open(PatternsPartEditComponent, {
      data: {
        part: part,
        index: index,
      }
    });
  }

}
