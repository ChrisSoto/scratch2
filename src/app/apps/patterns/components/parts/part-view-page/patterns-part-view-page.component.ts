import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogReturn, PPart } from '../../../model/models.interface';
import { filter, switchMap } from 'rxjs';
import { PatternSystemPartService } from '../../../services/pattern-system-part.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SystemPipe } from '../../../pipes/system.pipe';
import { UserPipe } from 'src/app/shared/user/pipes/user.pipe';
import { MatDialog } from '@angular/material/dialog';
import { PatternsPartEditComponent } from '../part-edit/patterns-part-edit.component';
import { PatternDialogReturnService } from '../../../services/pattern-dialog-return.service';
import { FirebaseDatePipe } from 'src/app/shared/pipes/firebase-date.pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patterns-part-view-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    SystemPipe,
    UserPipe,
    FirebaseDatePipe,
  ],
  templateUrl: './patterns-part-view-page.component.html',
  styleUrl: './patterns-part-view-page.component.scss'
})
export class PatternsPartViewPageComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private partService = inject(PatternSystemPartService);
  private dialogReturn = inject(PatternDialogReturnService);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);
  
  part = signal<PPart | null>(null);

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        filter(res => 'id' in res),
        switchMap(async res => {
          const doc = await this.partService.read(res['id']);
          if (!doc.exists()) return null;
          let data = doc.data() as PPart;
          data.id = doc.id;
          return data;
        })
      )
      .subscribe(part => {
        if (part) {
          this.part.set(part);
        }
      })
  }

  back() {
    this.router.navigate(['patterns/parts']);
  }

  editPart() {
    this.dialog.open(PatternsPartEditComponent, { data: this.part() })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => {
          if (!value) return this.dialogReturn.null<PPart>();
          const part = value.data as PPart;
          if (value.status === 'update') {
            return this.partService.update(part)
              .then(_ => {
                return this.dialogReturn.status<PPart>(value);
              });
          } else if (value.status === 'delete') {
            return this.partService.remove(part.id)
              .then(_ => {
                return this.dialogReturn.status<PPart>(value);
              });
          } else {
            return this.dialogReturn.null<PPart>();
          }
        })
      )
      .subscribe(value => {
        if (value.status === 'update') {
          this.part.set(value.data);
          this.snackbar.open('Part Updated!', undefined, { duration: 3000 });
        } else if (value.status === 'delete') {
          this.snackbar.open('Part Deleted', undefined, { duration: 3000 });
          this.router.navigate(['patterns/parts']);
        }
      })
  }

}