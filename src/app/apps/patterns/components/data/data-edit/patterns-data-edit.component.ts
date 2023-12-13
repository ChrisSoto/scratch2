import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { PSystem } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { PatternPartService } from '../../../services/pattern-part.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { BlockGroupComponent } from 'src/app/apps/block-editor/block-group/block-group.component';
import { Block, BlockGroup } from 'src/app/apps/block-editor/models/block.model';
import { PatternService } from '../../../services/pattern.service';
import { PatternsDataSystemPartComponent } from '../data-system-part/patterns-data-system-part.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

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
    PatternActiveSystemService,
    PatternService,
    PatternPartService,
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
    console.log(block);
  }

  onGenerationChange() {
    
  }
}
