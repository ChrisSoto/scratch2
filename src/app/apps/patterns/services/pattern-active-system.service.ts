
import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { PPart, PSystem } from '../model/models.interface';
import { PatternSystemPartService } from './pattern-system-part.service';
import { PatternSystemService } from './pattern-system.service';
import { PatternsSystemEditComponent } from '../components/systems/system-edit/patterns-system-edit.component';

@Injectable()
export class PatternActiveSystemService {

  public _system$: BehaviorSubject<PSystem | null> = new BehaviorSubject<PSystem | null>(null);
  public system$: Observable<PSystem | null> = this._system$.asObservable();

  private systemDialogRef!: MatDialogRef<PatternsSystemEditComponent>;

  private systemService = inject(PatternSystemService);
  private partService = inject(PatternSystemPartService);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);

  get system(): PSystem {
    return this._system$.value as PSystem;
  }

  setActive(system: PSystem, update?: boolean) {
    if (update) {
      this.update(system);
    } else {
      this._system$.next(system);
    }
  }

  clear() {
    this._system$.next(null);
  }

  update(system: Partial<PSystem>) {
    this.systemService.update(system)
      .then(() => {
        this.setActive(system as PSystem);

        // no good
        if (this.systemDialogRef) {
          this.systemDialogRef.close({ status: 'updated', system: system });
        } else {
          this.snackbar.open('System Updated!', undefined, { duration: 3000 });
          this.dialog.closeAll()
        }
      });
  }

  edit() {
    this.systemDialogRef = this.dialog.open(PatternsSystemEditComponent, { data: this.system });
  }

  remove(id: string): Promise<void> {
    return this.systemService.remove(id)
  }

  //
  //
  // Part Services
  //

  addPart(part: Partial<PPart>) {
    const system = this._system$.value;
    if (!system) return;
    // create parts array if it doesn't exist
    if (!('parts' in system) || !system.parts) system.parts = [];
    system.parts.push(part as PPart); // I don't know why I have to do this.
    this.systemService.update(system)
      .then(() => {
        this.setActive(system);
        this.snackbar.open('System Part Added!', undefined, { duration: 3000 })
      });
  }

  getPart() {
    const system = this._system$.value;
    if (!system) return null;
    return this.partService.newPart(system);
  }

  removePart(index: number) {
    const system = this._system$.value;
    if (system && system.parts) {
      system.parts.splice(index, 1);
      this.systemService.update(system)
        .then(() => {
          this.snackbar.open('System Part Removed!', undefined, { duration: 3000 })
        });
    }
  }

  updatePart(part: Partial<PPart>, index: number) {
    const system = this._system$.value;
    if (!system || !system.parts) return;
    system.parts[index] = part as PPart;
    this.systemService.update(system)
      .then(() => {
        this.snackbar.open('System Part Updated!', undefined, { duration: 3000 })
      });
  }

  //
  //
  // dialog services
  //

  // closePartDialog(): MatDialogRef<PatternsPartEditComponent> | undefined {
  //   if (!this.partDialogRef) return;
  //   this.partDialogRef.close();
  //   return this.partDialogRef;
  // }

  closeSystemDialog(): MatDialogRef<PatternsSystemEditComponent> | undefined {
    if (!this.systemDialogRef) return;
    this.systemDialogRef.close();
    return this.systemDialogRef;
  }

}