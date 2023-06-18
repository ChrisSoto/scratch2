import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HymnService } from '../../services/hymn.service';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChurchHymn } from '../../interface/ChurchSlideshow.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-edit-hymn',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    HymnService
  ],
  templateUrl: './edit-hymn.component.html',
  styleUrls: ['./edit-hymn.component.scss']
})
export class EditHymnComponent {
  dialogRef = inject(MatDialogRef<EditHymnComponent>);
  formBuilder = inject(FormBuilder);

  private hymnService = inject(HymnService);

  hymnForm = new FormGroup({
    number: new FormControl('')
  });

  selectedHymn$!: Observable<ChurchHymn>;
  selectedHymn!: ChurchHymn;

  selectHymn() {
    const number = this.hymnForm.get('number')?.value;
    if (!number) return;
    this.selectedHymn$ = this.hymnService.read$(number)
      .pipe(
        map(hymn => {
          console.log(hymn)
          if (hymn.lyrics['s1'][0] === 'no lyrics') {
            hymn.title = '!!!NO LYRICS!!! ' + hymn.title;
          }
          this.selectedHymn = hymn;
          return hymn;
        })
      );
  }

  select() {
    this.dialogRef.close(this.selectedHymn);
  }
}
