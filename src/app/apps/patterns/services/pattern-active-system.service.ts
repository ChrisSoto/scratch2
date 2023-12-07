import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DialogReturn, DialogStatus, PPart, PSystem } from '../model/models.interface';
import { PatternSystemPartService } from './pattern-system-part.service';
import { PatternSystemService } from './pattern-system.service';

@Injectable()
export class PatternActiveSystemService {

  public _system$: BehaviorSubject<PSystem | null> = new BehaviorSubject<PSystem | null>(null);
  public system$: Observable<PSystem | null> = this._system$.asObservable();

  private systemService = inject(PatternSystemService);
  private partService = inject(PatternSystemPartService);

  private snackbar = inject(MatSnackBar);

  get system(): PSystem {
    return this._system$.value as PSystem;
  }

  setActive(system: PSystem, updateDB?: boolean) {
    if (updateDB) {
      this.updateSystem(system);
    } else {
      this._system$.next(system);
    }
  }

  //
  //
  // Systems
  //

  editSystem(value: DialogReturn<PSystem>): Promise<DialogReturn<PSystem>> {
    if (!value) return this.nullDialog<PSystem>();
    const system = value.data as PSystem;
    if (value.status === 'create') {
      return this.createSystem(system)
        .then(_ => {
          return this.dialogStatus<PSystem>(value);
        })
    } else if (value.status === 'update') {
      return this.updateSystem(system)
        .then(_ => {
          return this.dialogStatus<PSystem>(value);
        });
    } else if (value.status === 'delete') {
      return this.removeSystem(system.id)
        .then(_ => {
          return this.dialogStatus<PSystem>(value);
        });
    } else {
      return this.nullDialog<PSystem>();
    }
  }

  createSystem(system: Partial<PSystem>) {
    return this.systemService.create(system);
  }

  updateSystem(system: Partial<PSystem>): Promise<void> {
    return this.systemService.update(system)
      .then(_ => this.setActive(system as PSystem, false));
  }

  removeSystem(id: string): Promise<void> {
    return this.systemService.remove(id);
  }

  clear() {
    this._system$.next(null);
  }

  //
  //
  // Part Services
  //

  editPart(value: DialogReturn<PPart>): Promise<DialogReturn<PPart>> {
    if (!value) return this.nullDialog<PPart>();
    const part = value.data as PPart;
    if (value.status === 're-use') {
      return this.addPart(part)
        .then(_ => {
          return this.dialogStatus<PPart>(value);
        })
    } else if (value.status === 'create') {
      return this.createPart(part)
        .then(_ => {
          return this.dialogStatus<PPart>(value);
        })
    } else if (value.status === 'update') {
      return this.updatePart(part)
        .then(_ => {
          return this.dialogStatus<PPart>(value);
        });
    } else if (value.status === 'delete') {
      return this.removePart(part)
        .then(_ => {
          return this.dialogStatus<PPart>(value);
        });
    } else {
      return this.nullDialog<PPart>();
    }
  }

  createPart(part: Partial<PPart>) {
    // create part then attatch it to the system
    return this.partService.create(part)
      .then(doc => {
        return this.partService.read(doc.id);
      })
      .then(res => {
        const part = Object.assign( { id: res.id }, res.data()) as PPart;
        return this.addPart(part);
      })
  }

  getPart() {
    const system = this._system$.value;
    if (!system) return null;
    return this.partService.newPart(system);
  }

  addPart(part: PPart) {
    const system = this._system$.value as PSystem;
    // attatch part to system
    part.order = this.nextPartIndex();
    system.parts.push(part);
    return this.systemService.update(system);
  }

  updatePart(part: PPart): Promise<void> {
    const system = this._system$.value as PSystem;
    system.parts[part.order - 1] = part;
    return this.systemService.update(system)
      .then(_ => {
        return this.setActive(system, false);
      }, error => {
        console.error(error);
      });
  }

  removePart(part: PPart): Promise<void> {
    const system = this._system$.value as PSystem;
    // remove
    system.parts.splice(part.order - 1, 1);
    // re-order
    this.orderParts();
    // save
    return this.systemService.update(system)
      .then(_ => {
        return this.setActive(system, false);
      });
  }

  //
  //
  // other
  //

  dialogStatus<T>(value: DialogReturn<T>): Promise<DialogReturn<T>> {
    return new Promise(resolve => {
      if (value.data) {
        resolve(value);
      } else {
        resolve({ status: value.status, data: null });
      }
    });
  }

  orderParts(): void {
    const system = this._system$.value as PSystem;
    const parts = system.parts;
    if (parts.length) {
      parts.forEach((part, index) => {
        part.order = index + 1;
      });
    }
  }

  nextPartIndex(): number {
    const system = this._system$.value as PSystem;
    return system.parts.length + 1;
  }

  // move this to a dialogReturn service
  nullDialog<T>(): Promise<DialogReturn<T>> {
    return new Promise((resolve) => resolve({ status: 'cancel', data: null }))
  }

}
