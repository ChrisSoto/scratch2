import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { PSystem } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { PatternSystemPartService } from '../../../services/pattern-system-part.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { BlockGroupComponent } from 'src/app/apps/block-editor/block-group/block-group.component';
import { Block, BlockGroup } from 'src/app/apps/block-editor/models/block.model';
import { PatternService } from '../../../services/pattern.service';
import { PatternsDataSystemPartComponent } from '../data-system-part/patterns-data-system-part.component';

@Component({
  selector: 'patterns-data-edit',
  standalone: true,
  imports: [
    CommonModule,
    PatternsDataSystemPartComponent,
    MatDialogModule,
    MatCardModule,
    CommonFabButtonComponent,
    BlockGroupComponent
  ],
  providers: [
    PatternActiveSystemService,
    PatternService,
    PatternSystemPartService,
  ],
  templateUrl: './patterns-data-edit.component.html',
  styleUrls: ['./patterns-data-edit.component.scss']
})
export class PatternsDataEditComponent {

  public patternId!: string;
  public active = inject(PatternActiveSystemService);
  public route = inject(ActivatedRoute);
  private patternService = inject(PatternService);
  blockGroup!: BlockGroup;

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          this.patternId = params['id'];
          return this.patternService.read(this.patternId)
        })
      )
      .subscribe(res => {
        const system = res.data() as PSystem;
        system.id = this.patternId;
        if (system.parts) {
          this.blockGroup = this.patternService.partToBlockGroup(system.parts[0])
        }
        this.active.setActive(system);
      })
  }

  onAddChange(block: Block) {
    // add this to the notes property
    const system = this.active._system$.value as PSystem;
    const updatedSystem = this.patternService.addNoteToSystemPart(system);
    this.active._system$.next(system);
  }

  addPart() {
    const system = this.active._system$.getValue() as PSystem;
    
    if (!Array.isArray(system.parts)) {
      system.parts = [];
    } else {
      system.parts.push({
        id: '',
        name: 'Test',
        description: 'Description',
        generatorIds: system.parts[0].generatorIds,
        order: 0
      });
    }

    this.active._system$.next(system);
  } 
}
