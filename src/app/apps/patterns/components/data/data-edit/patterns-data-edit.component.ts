import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { DialogReturn, PData, PDataTree, PDataTree2, PDataUpdate, PSystem } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { BlockGroupComponent } from 'src/app/apps/block-editor/block-group/block-group.component';
import { Block } from 'src/app/apps/block-editor/models/block.model';
import { PatternService } from '../../../services/pattern.service';
import { PatternsDataSystemPartComponent } from '../data-system-part/patterns-data-system-part.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PatternDataService } from '../../../services/pattern-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatternSystemService } from '../../../services/pattern-system.service';
import { PatternsDataDisplayComponent } from '../patterns-data-display/patterns-data-display.component';
import { PatternsSystemEditComponent } from '../../systems/system-edit/patterns-system-edit.component';
import { PatternEditPatternService } from '../../../services/pattern-edit-pattern.service';
import { PatternDataTreeService } from '../../../services/pattern-data-tree.service';


@Component({
  selector: 'patterns-data-edit',
  standalone: true,
  imports: [
    CommonModule,
    PatternsDataSystemPartComponent,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    CommonFabButtonComponent,
    BlockGroupComponent,
    PatternsDataDisplayComponent,
  ],
  templateUrl: './patterns-data-edit.component.html',
  styleUrls: ['./patterns-data-edit.component.scss']
})
export class PatternsDataEditComponent {

  public active = inject(PatternActiveSystemService);
  public patternData = signal<PData[] | null>(null);

  public dataTreeService = inject(PatternDataTreeService);

  private patternId!: string;
  private depth: number = 0;
  private sub$$!: Subscription;

  private route = inject(ActivatedRoute);
  private dataService = inject(PatternDataService);
  private patternService = inject(PatternService);
  private patternEdit = inject(PatternEditPatternService);
  private systemService = inject(PatternSystemService);
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.sub$$ = this.route.params
      .pipe(
        switchMap(params => {
          this.patternId = params['id'];

          if (params['depth'] != undefined) {
            this.depth = params['depth'];
          }

          return this.patternService.read$(this.patternId);
        }),
        switchMap(res => {
          const system = res.data() as PSystem;
          system.id = this.patternId;

          this.active.setActive(system);

          if (system.hasData) {
            return this.dataService.list$([
              { name: 'orderBy', field: 'depth' },
              { name: 'where', field: 'depth', operator: '<', value: this.depth + 4 },
              { name: 'where', field: 'patternId', operator: '==', value: system.id },
              { name: 'orderBy', field: 'order', direction: 'asc' },
            ]) // why two?
          }

          return of(this.dataService.convertPartsToData(system, null));
        }),
      )
      .subscribe((data: PData[]) => {
        // console.log('loaded', data);
        this.dataTreeService.setup(data);
        this.patternData.set(data);
      })
  }

  onTitleChange(update: PDataUpdate) {
    update.data.data.title = update.title as string;
    if (update.data.id) {
      this.updateData(update.data, 'Title');
    } else {
      this.createData(update.data, update.index, 'Data');
    }
  }

  onUpdateChange(update: PDataUpdate) {
    const block = update.block as Block;
    update.data.data.blocks[block.order] = block;
    if (update.data.id) {
      this.updateData(update.data, 'Data');
    } else {
      this.createData(update.data, update.index, 'Data');
    }
  }

  onAddChange(update: PDataUpdate) {
    const block = update.block as Block;
    // if inserting at the end
    if (block.order === update.data.data.blocks.length) {
      update.data.data.blocks[block.order] = block;
    // if inserting in the middle
    } else {
      update.data.data.blocks.splice(block.order, 0, block);
    }

    update.data.data.blocks.map((block, index) => block.order = index);
    if (update.data.id) {
      this.updateData(update.data, 'Block Addded');
    } else {
      this.createData(update.data, update.index, 'Data');
    }
  }

  onRemoveChange(update: PDataUpdate) {
    const block = update.block as Block;
    if (update.data.data.blocks.length > 1) {
      update.data.data.blocks.splice(block.order, 1);
      update.data.data.blocks.map((block, index) => block.order = index);
      this.updateData(update.data, 'Blocks');
    } else {
      const data = this.patternData() as PData[];
      if (data.length === 1) {
        // last data attached to system
        const system = this.active.system() as PSystem;
        system.hasData = false;
        this.dataService.remove(update.data.id)
          .then(_ => {
            return this.patternService.update(system);
          })
          .then(_ => {
            this.snackbar.open('Data Removed!', undefined, { duration: 3000 });
          });
      } else {
        this.dataService.remove(update.data.id)
          .then(_ => {
            this.snackbar.open('Data Removed!', undefined, { duration: 3000 });
          });  
      }
    }
  }

  onGenerateChange(dataTree: PDataTree2) {
    const data = dataTree.self;
    if (data.generatorIds && data.generatorIds?.length === 1) {
      // generate
      this.systemService.read(data.generatorIds[0])
        .then(res => {
          if (res.exists()) {
            const system = res.data() as PSystem;
            system['id'] = res.id;
            const patternData = this.dataService.convertPartsToData(system, data);
            return this.dataService.create(patternData, dataTree.children.length, data.depth + 1);
          } else {
            return new Promise(r => r('Error'));
          }
        })
        .then(_ => {
          this.snackbar.open(`Generated!`, undefined, { duration: 3000 });
        });

      return;
    }

    // show a selection list
  }

  onAddSiblingChange() {
    const system = this.active.system() as PSystem;
    const parts = this.dataService.convertPartsToData(system, null);
    const data = this.patternData() as PData[];
    this.createData(parts[0], data.length, 'Pattern');
  }

  createData(data: PData, index: number, updateTo: string) {
    const system = this.active.system() as PSystem;
    system.hasData = true;
    this.dataService.create([data], index)
      .then(_ => {
        return this.patternService.update(system);
      })
      .then(_ => {
        this.snackbar.open(`${updateTo} Created!`, undefined, { duration: 3000 });
      });
  }

  updateData(data: PData, updateTo: string) {
    this.dataService.update(data)
      .then(_ => {
        this.snackbar.open(`${updateTo} Updated!`, undefined, { duration: 3000 });
      });
  }

  onEditPattern() {
    this.dialog.open(PatternsSystemEditComponent, { data: this.active.system() })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PSystem>): PromiseLike<DialogReturn<PSystem>> => this.patternEdit.edit(value))
      )
      .subscribe(value => {
        if (value.status === 'create') {
          this.snackbar.open('New System Created!', undefined, { duration: 3000 });
        } else if (value.status === 'update') {
          this.snackbar.open('System Updated!', undefined, { duration: 3000 });
        } else if (value.status === 'delete') {
          this.snackbar.open('System Deleted!', undefined, { duration: 3000 });
        } else {
          // cancel
        }
      });
  }

  ngOnDestroy() {
    this.sub$$.unsubscribe();
    this.active.clear();
  }

}
