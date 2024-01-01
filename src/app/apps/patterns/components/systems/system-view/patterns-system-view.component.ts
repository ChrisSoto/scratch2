import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { PSystem, PPart, DialogReturn } from '../../../model/models.interface';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { PatternSystemService } from '../../../services/pattern-system.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { PatternsPartViewComponent } from '../../parts/part-view/patterns-part-view.component';
import { PatternsPartEditComponent } from '../../parts/part-edit/patterns-part-edit.component';
import { CategorySelectComponent } from '../../categories/category-select/category-select.component';
import { MatDividerModule } from '@angular/material/divider';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatternsSystemEditComponent } from '../system-edit/patterns-system-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatternEditPartService } from '../../../services/pattern-edit-part.service';
import { PatternEditSystemService } from '../../../services/pattern-edit-system.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'patterns-system-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
    DragDropModule,
    PatternsPartEditComponent,
    PatternsPartViewComponent,
    CategorySelectComponent,
    CommonFabButtonComponent,
  ],
  templateUrl: './patterns-system-view.component.html',
  styleUrls: ['./patterns-system-view.component.scss']
})
export class PatternsSystemViewComponent implements OnInit, OnDestroy {

  showEditor = false;

  active = inject(PatternActiveSystemService);

  private part = inject(PatternEditPartService);
  private system = inject(PatternEditSystemService);
  private dialog = inject(MatDialog);
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private systemService = inject(PatternSystemService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        filter(res => 'id' in res),
        switchMap(async res => {
          const doc = await this.systemService.read(res['id']);
          if (!doc.exists()) return null;
          let data = doc.data() as PSystem;
          data.id = doc.id;
          return data;
        })
      )
      .subscribe(system => {
        if (system) {
          this.active.setActive(system);
        }
      })
  }

  drop(event: CdkDragDrop<PPart>) {
    const system = this.active.system(); // check for parts below
    if (!system || !system.parts) return;
    const parts = system.parts;
    moveItemInArray(parts, event.previousIndex, event.currentIndex);
    system.parts = parts;
    this.active.setActive(system);
  }

  addPart() {
    this.dialog.open(PatternsPartEditComponent, { data: null })
    .afterClosed()
    .pipe(
      switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => this.part.edit(value))
    )
    .subscribe(value => {
      if (value.status === 'create') {
        const system = value.data as PPart;
        this.snackBar.open('New Part Created!', undefined, { duration: 3000 });
      } else if (value.status === 'update') {
        const system = value.data as PPart;
        this.snackBar.open('Part Updated!', undefined, { duration: 3000 });
      } else if (value.status === 'delete') {
        this.snackBar.open('Part Deleted!', undefined, { duration: 3000 });
      } else {
        // cancel
      }
    })
  }

  editSystem() {
    this.dialog.open(PatternsSystemEditComponent, { data: this.active.system() })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PSystem>): PromiseLike<DialogReturn<PSystem>> => this.system.edit(value))
      )
      .subscribe(value => {
        if (value.status === 'create') {
          const system = value.data as PSystem;
          this.router.navigate(['patterns/edit/' + system.id]);
          this.snackBar.open('New System Created!', undefined, { duration: 3000 });
        } else if (value.status === 'update') {
          const system = value.data as PSystem;
          this.snackBar.open('System Updated!', undefined, { duration: 3000 });
        } else if (value.status === 'delete') {
          this.router.navigate(['patterns/view'])
          this.snackBar.open('System Deleted!', undefined, { duration: 3000 });
        } else {
          // cancel
        }
      });
  }

  onSubSystemChange(checked: boolean) {
    const system = this.active.system() as PSystem;
    system.isSubSystem = checked;
    this.system.edit({ status: 'update', data: system })
      .then(_ => {
        this.snackBar.open('System Updated!', undefined, { duration: 3000 });
      });
  }

  onSiblingsChange(checked: boolean) {
    const system = this.active.system() as PSystem;
    system.hasSiblings = checked;
    this.system.edit({ status: 'update', data: system })
      .then(_ => {
        this.snackBar.open('System Updated!', undefined, { duration: 3000 });
      });
  }

  onRemoveChange(index: number) {
    if (index > -1) {
      const system = this.active.system();
      system?.parts.splice(index, 1);
      this.system.edit({ status: 'update', data: system })
        .then(val => {
          this.snackBar.open('System Updated!', undefined, { duration: 3000 });
        });
    }
  }

  ngOnDestroy(): void {
    this.active.clear();
  }
}
