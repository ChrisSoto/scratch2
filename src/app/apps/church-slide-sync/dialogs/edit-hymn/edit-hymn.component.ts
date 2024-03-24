import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HymnService } from '../../services/hymn.service';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChurchHymn } from '../../interface/ChurchSlideshow.interface';
import { Observable, Subscription, debounceTime, filter, map, mergeMap, switchMap, tap } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonFabButtonComponent,
    MatExpansionModule,
  ],
  providers: [
    HymnService
  ],
  templateUrl: './edit-hymn.component.html',
  styleUrls: ['./edit-hymn.component.scss']
})
export class EditHymnComponent {
  dialogRef = inject(MatDialogRef<EditHymnComponent>);
  fb = inject(FormBuilder);

  private hymnService = inject(HymnService);

  hymnForm = this.fb.group({
    number: ['']
  });

  lyricsInfoForm = this.fb.group({
    title: ['', Validators.required],
    number: ['', Validators.required],
    publication: ['', Validators.required],
    tune: ['', Validators.required],
  });

  lyricsForm = this.fb.record({
    's1': this.fb.array([
      this.fb.control(''),
    ]),
  });

  selectedHymn = signal<ChurchHymn | null>(null);
  hasLyrics = signal(false);
  loading = signal(false);
  expanded = signal(true);

  currentTabIndex = signal(0);

  hymnForm$$!: Subscription;

  ngOnInit() {
    this.hymnForm.valueChanges
      .pipe(
        filter(({number}) => !!number),
        tap(() => this.loading.set(true)),
        map(({number}) => number ? +number : 0),
        debounceTime(750),
        switchMap((number) => this.hymnService.read$(number)),
      )
      .subscribe((hymn) => {
        // either set the hymn or notify the user there is no hymn
        // and they need to create it
        this.selectedHymn.set(hymn);
        this.checkLyrics();
        this.loading.set(false);
      });
  }

  checkLyrics() {
    const hymn = this.selectedHymn();
    if (!hymn) return;
    this.hasLyrics.set(hymn.lyrics['s1'][0] !== 'no lyrics')
  }

  customLyrics() {
    // expand the dialog
    this.dialogRef.updateSize('100%');
    // move to the custom lyrics tab
    this.currentTabIndex.set(1);
    // open the expansion panel
    this.expanded.set(true);
    // set the hymn number in the form
    const number = this.selectedHymn()?.number
    if (number) {
      this.lyricsInfoForm.patchValue({ number: number.toString() });
    }
  }

  setRefrain() {}

  private incrementKey(key: string): string {
    const keyArr = key.split('');
    const secondChar = parseInt(keyArr[1], 10) + 1;
    keyArr[1] = secondChar.toString();
    return keyArr.join('');
  }

  addVerse(key?: string) {
    if (!key) {
      const keys = Object.keys(this.lyricsForm.controls);
      key = keys[keys.length - 1];
      key = this.incrementKey(key);
    } else {
      key = this.incrementKey(key);
    }

    this.lyricsForm.addControl(key, this.fb.array([
      this.fb.control(''),
    ]));
  }

  removeVerse(key: string) {
    this.lyricsForm.removeControl(key);
  }

  addLine(key: string) {
    (this.lyricsForm.get(key) as FormArray).push(this.fb.control(''))
  }

  removeLine(key: string, index: number) {
    (this.lyricsForm.get(key) as FormArray).removeAt(index)
  }

  ngOnDestroy() {
    this.hymnForm$$?.unsubscribe();
  }
}
