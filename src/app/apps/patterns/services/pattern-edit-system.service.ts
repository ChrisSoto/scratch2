import { Injectable, inject } from '@angular/core';
import { DialogReturn, PSystem } from '../model/models.interface';
import { PatternDialogReturnService } from './pattern-dialog-return.service';
import { PatternSystemService } from './pattern-system.service';
import { PatternActiveSystemService } from './pattern-active-system.service';

@Injectable()
export class PatternEditSystemService {

  private dialogReturn = inject(PatternDialogReturnService);
  private systemService = inject(PatternSystemService);
  private active = inject(PatternActiveSystemService);

  edit(value: DialogReturn<PSystem>): Promise<DialogReturn<PSystem>> {
    if (!value) return this.dialogReturn.null<PSystem>();
    const system = value.data as PSystem;
    if (value.status === 'create') {
      return this.createSystem(system)
        .then(_ => {
          return this.dialogReturn.status<PSystem>(value);
        })
    } else if (value.status === 'update') {
      return this.updateSystem(system)
        .then(_ => {
          return this.dialogReturn.status<PSystem>(value);
        });
    } else if (value.status === 'delete') {
      return this.removeSystem(system.id)
        .then(_ => {
          return this.dialogReturn.status<PSystem>(value);
        });
    } else {
      return this.dialogReturn.null<PSystem>();
    }
  }

  createSystem(system: Partial<PSystem>) {
    return this.systemService.create(system);
  }

  updateSystem(system: Partial<PSystem>): Promise<void> {
    return this.systemService.update(system)
      .then(_ => this.active.setActive(system as PSystem));
  }

  removeSystem(id: string): Promise<void> {
    return this.systemService.remove(id);
  }
}
