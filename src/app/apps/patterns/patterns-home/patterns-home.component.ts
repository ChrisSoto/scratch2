import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { PatternSystemService } from '../services/pattern-system.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatternsSystemEditComponent } from '../components/systems/system-edit/patterns-system-edit.component';
import { PatternActiveSystemService } from '../services/pattern-active-system.service';
import { PatternService } from '../services/pattern.service';
import { PatternSystemPartService } from '../services/pattern-system-part.service';
import { switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PSystem } from '../model/models.interface';
import { PatternDialogReturnService } from '../services/pattern-dialog-return.service';

@Component({
  selector: 'app-patterns-home',
  standalone: true,
  templateUrl: './patterns-home.component.html',
  styleUrls: ['./patterns-home.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
  ],
  providers: [
    PatternActiveSystemService,
    PatternSystemPartService,
    PatternSystemService,
    PatternService,
    PatternDialogReturnService,
    MatDialog,
  ]
})
export class PatternsHomeComponent {

  private dialog = inject(MatDialog);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private systemService = inject(PatternSystemService);
  private snackbar = inject(MatSnackBar)

  newSystem() {
    this.dialog.open(PatternsSystemEditComponent)
      .afterClosed()
      .pipe(
        switchMap(value => {
          return this.systemService.create(value.data)
            .then(_ => {
              return {
                status: 'create',
                data: value.data as PSystem
              }
            })
        })
      )
      .subscribe(value => {
        this.snackbar.open(`System "${ value.data.name }" Created`, undefined, { duration: 3000 });
      });
  }

  viewSystems() {
    this.router.navigate(['view'], { relativeTo: this.activatedRoute });
  }

  viewParts() {
    this.router.navigate(['parts'], { relativeTo: this.activatedRoute });
  }

}
