import { Injectable, inject } from '@angular/core';
import { DialogReturn, PPart, PSystem } from '../model/models.interface';
import { PatternDialogReturnService } from './pattern-dialog-return.service';
import { PatternPartService } from './pattern-part.service';
import { PatternActiveSystemService } from './pattern-active-system.service';
import { PatternSystemService } from './pattern-system.service';

@Injectable()
export class PatternEditPartService {

 
  private active = inject(PatternActiveSystemService);
  private partService = inject(PatternPartService);
  private systemService = inject(PatternSystemService);
  private dialogReturn = inject(PatternDialogReturnService);

  edit(value: DialogReturn<PPart>): Promise<DialogReturn<PPart>> {
    if (!value) return this.dialogReturn.null<PPart>();
    const part = value.data as PPart;
    if (value.status === 're-use') {
      return this.addPart(part)
        .then(_ => {
          return this.dialogReturn.status<PPart>(value);
        })
    } else if (value.status === 'create') {
      return this.createPart(part)
        .then(_ => {
          return this.dialogReturn.status<PPart>(value);
        })
    } else if (value.status === 'update') {
      return this.updatePart(part)
        .then(_ => {
          return this.dialogReturn.status<PPart>(value);
        });
    } else if (value.status === 'delete') {
      return this.removePart(part)
        .then(_ => {
          return this.dialogReturn.status<PPart>(value);
        });
    } else {
      return this.dialogReturn.null<PPart>();
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

  addPart(part: PPart) {
    const system = this.active.system() as PSystem;
    // attatch part to system
    part.order = this.active.nextPartIndex();
    system.parts.push(part);
    return this.systemService.update(system);
  }

  updatePart(part: PPart): Promise<void> {
    const system = this.active.system() as PSystem;
    system.parts[part.order - 1] = part;
    return this.systemService.update(system)
      .then(_ => {
        return this.active.setActive(system);
      }, error => {
        console.error(error);
      });
  }

  removePart(part: PPart): Promise<void> {
    const system = this.active.system() as PSystem;
    // remove
    system.parts.splice(part.order - 1, 1);
    // re-order
    this.active.orderParts();
    // save
    return this.systemService.update(system)
      .then(_ => {
        return this.active.setActive(system);
      });
  }
}
