import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { PData, PSystem } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { BlockGroupComponent } from 'src/app/apps/block-editor/block-group/block-group.component';
import { Block } from 'src/app/apps/block-editor/models/block.model';
import { PatternService } from '../../../services/pattern.service';
import { PatternsDataSystemPartComponent } from '../data-system-part/patterns-data-system-part.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PatternDataService } from '../../../services/pattern-data.service';
import { PatternBlockService } from '../../../services/pattern-block.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  providers: [
    PatternBlockService,
  ],
  templateUrl: './patterns-data-edit.component.html',
  styleUrls: ['./patterns-data-edit.component.scss']
})
export class PatternsDataEditComponent {

  public active = inject(PatternActiveSystemService);
  public patternData = signal<PData[]>([]);

  private patternId!: string;
  private depth: number = 0;

  private route = inject(ActivatedRoute);
  private dataService = inject(PatternDataService);
  private patternService = inject(PatternService);
  private patternBlockService = inject(PatternBlockService);
  private snackbar = inject(MatSnackBar);

  ngOnInit() {
    this.route.params
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
              { name: 'where', field: 'patternId', operator: '==', value: system.id },
              { name: 'where', field: 'depth', operator: '==', value: this.depth }
            ])
          }

          return of(this.setupParts(system));
        })
      )
      .subscribe((data: PData[]) => {
        this.patternData.set(data);
      })
  }

  onTitleChange(title: string, index: number, data: PData) {
    data.data.title = title;
    if (data.id) {
      this.updateData(data, 'Title');
    } else {
      this.createData(data, index, 'Data');
    }
  }
  
  onAddChange(block: Block, index: number, data: PData) {
    // if inserting at the end
    if (block.order === data.data.blocks.length) {
      data.data.blocks[block.order] = block;
    // if inserting in the middle
    } else {
      data.data.blocks.splice(block.order, 0, block);
    }

    data.data.blocks.map((block, index) => block.order = index);
    if (data.id) {
      this.updateData(data, 'Block Addded');
    } else {
      this.createData(data, index, 'Data');
    }
  }

  onUpdateChange(block: Block, index: number, data: PData) {
    data.data.blocks[block.order] = block;
    if (data.id) {
      this.updateData(data, 'Data');
    } else {
      this.createData(data, index, 'Data');
    }
  }

  onRemoveChange(block: Block, data: PData) {
    if (data.data.blocks.length > 1) {
      data.data.blocks.splice(block.order, 1);
      data.data.blocks.map((block, index) => block.order = index);
      this.updateData(data, 'Blocks');
    } else {
      if (this.patternData().length === 1) {
        // last data attached to system
        const system = this.active.system() as PSystem;
        system.hasData = false;
        this.dataService.remove(data.id)
          .then(_ => {
            return this.patternService.update(system);
          })
          .then(_ => {
            this.snackbar.open('Data Removed!', undefined, { duration: 3000 });
          });
      } else {
        this.dataService.remove(data.id)
          .then(_ => {
            this.snackbar.open('Data Removed!', undefined, { duration: 3000 });
          });  
      }
    }
  }

  createData(data: PData, index: number, updateTo: string) {
    const system = this.active.system() as PSystem;
    system.hasData = true;
    this.dataService.create(data, index)
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

  onGenerationChange() {
    console.log(this.active.system())
  }

  setupParts(system: PSystem) {
    let parts = [];
    for (let i = 0; i < system.parts.length; i++) {
      const part = system.parts[i];
      const dataPart =  {
        id: '',
        systemId: system.systemId as string,
        patternId: system.id,
        parentId: '',
        partId: part.id,
        order: i,
        depth: 0,
        data: this.patternBlockService.convert(part)
      }
      parts.push(dataPart);
    }
    return parts;
  }

}
