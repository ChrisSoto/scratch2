import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, from, of, switchMap } from 'rxjs';
import { PSystem, PPart } from '../../../model/models.interface';
import { ActiveSystemService } from '../../../services/active-system.service';
import { SystemPartService } from '../../../services/system-part.service';
import { SystemService } from '../../../services/system.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { PatternsPartViewComponent } from '../../parts/part-view/patterns-part-view.component';
import { PatternsPartEditComponent } from '../../parts/part-edit/patterns-part-edit.component';
import { CategorySelectComponent } from '../../categories/category-select/category-select.component';
import { MatDividerModule } from '@angular/material/divider';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'patterns-system-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    DragDropModule,
    PatternsPartEditComponent,
    PatternsPartViewComponent,
    CategorySelectComponent,
    CommonFabButtonComponent,
  ],
  providers: [
    ActiveSystemService,
    SystemPartService,
  ],
  templateUrl: './patterns-system-view.component.html',
  styleUrls: ['./patterns-system-view.component.scss']
})
export class PatternsSystemViewComponent implements OnInit, OnDestroy {

  showEditor = false;

  active = inject(ActiveSystemService);
  partService = inject(SystemPartService);
  private router = inject(ActivatedRoute);
  private systemService = inject(SystemService);

  ngOnInit(): void {
    this.router.params
      .pipe(
        filter(res => 'id' in res),
        switchMap(async res => {
          const doc = await this.systemService.read(res['id']);
          if (!doc.exists())
            return null;

          let data = doc.data() as PSystem;
          data.id = doc.id;
          return data;
        })
      )
      .subscribe(res => {
        if (res) {
          this.active.setActive(res);
        }
      })
  }

  drop(event: CdkDragDrop<PPart>) {
    const system = this.active._system$.value;
    if (!system || !system.parts) return;
    const parts = system.parts;
    moveItemInArray(parts, event.previousIndex, event.currentIndex);
    system.parts = parts;
    this.active.setActive(system, true);

  }

  createPart() {
    this.active.getPart();
    this.showEditor = true;
  }

  onNewPartCancel(isCanceled: boolean) {
    this.showEditor = false;
  }

  ngOnDestroy(): void {
    this.active.clear();
  }
}
