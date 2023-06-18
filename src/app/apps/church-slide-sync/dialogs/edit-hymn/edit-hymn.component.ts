import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HymnService } from '../../services/hymn.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-hymn',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    HymnService
  ],
  templateUrl: './edit-hymn.component.html',
  styleUrls: ['./edit-hymn.component.scss']
})
export class EditHymnComponent {
  dialogRef = inject(MatDialogRef);
  hymnService = inject(HymnService);
  selectedHymn: number = 1;

  selectHymn() {

  }
}
