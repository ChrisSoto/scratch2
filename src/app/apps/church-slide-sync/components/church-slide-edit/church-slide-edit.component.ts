import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { Subscription, Unsubscribable, filter, map, mergeMap, of, tap } from 'rxjs';
import { ChurchSlideshowService } from '../../services/church-slideshow.service';
import { ChurchSlideType } from '../../interface/ChurchSlideshow.interface';
import { CommonSelectComponent } from 'src/app/shared/components/common-select/common-select.component';
import { ChurchSlideTypeEditComponent } from '../church-slide-type-edit/church-slide-type-edit.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewSlidesFormComponent } from '../../dialogs/new-slides-form/new-slides-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionStatusService } from 'src/app/shared/services/action-status.service';
import { RemoveServiceComponent } from '../../dialogs/remove-service/remove-service.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SlideshowControlsService } from '../../services/slideshow-controls.service';
@Component({
  selector: 'app-church-slide-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonSelectComponent,
    ChurchSlideTypeEditComponent,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './church-slide-edit.component.html',
  styleUrls: ['./church-slide-edit.component.scss']
})
export class ChurchSlideEditComponent {

  @Input() id?: string;

  active = inject(ActiveChurchSlideshowService);
  dialog = inject(MatDialog);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  slideshowService = inject(ChurchSlideshowService);
  private actionStatus = inject(ActionStatusService);
  private controls = inject(SlideshowControlsService);

  loadSlideshow$!: Subscription;
  editSlideshow$!: Subscription;

  editMode = signal(false);

  slideOptions: ChurchSlideType[] = [
    'HYMN', 'IMAGE', 'TEXT', 'EMPTY'
  ];

  ngOnInit() {
    this.loadSlideshow();
  }

  toggleControls() {
    const state = this.controls.navControls();
    this.controls.navControls.set(!state);
  }

  edit() {
    const mode = this.editMode();
    this.editMode.set(!mode);
  }

  goBack() {
    this.router.navigate(['church-slide-sync']);
  }

  editSlideshow() {
    const slideshow = this.active.slideshow$.value;
    this.editSlideshow$ = this.dialog.open(NewSlidesFormComponent, { data: slideshow})
      .afterClosed()
      .pipe(
        filter(slideshow => slideshow),
        mergeMap((slideshow) => {
          slideshow.id = this.id;
          return this.slideshowService.update(slideshow);
        })
      )
      .subscribe((_) => {
        this.actionStatus.success(`Slideshow Updated!`);
      });
  }

  deleteSlideshow() {
    this.dialog.open(RemoveServiceComponent)
      .afterClosed()
      .pipe(
        filter((confirm) => confirm),
      )
      .subscribe((remove) => {
        if (!remove) return; 
        if (!this.id) return;
        this.loadSlideshow$?.unsubscribe()
        this.slideshowService.remove(this.id)
          .then(() => {
            this.actionStatus.success(`Slideshow Deleted!`);
            this.router.navigate(['church-slide-sync']);
          }).catch((err) => {
            this.actionStatus.failure(err);
          });
      });
  }

  onAddOptionChange(slideType: ChurchSlideType | null) {
    const slide = slideType as ChurchSlideType;
    this.active.addSlide(slide);
  }

  loadSlideshow() {
    if (!this.id) return;
    this.loadSlideshow$ = this.slideshowService.observe(this.id)
      .subscribe((slideshow) => {
        if (slideshow) {
          this.active.setSlideshow(slideshow);
        }
      });
  }

  move(event: CdkDragDrop<string[]>) {
    let slides = this.active.slides$.value;
    moveItemInArray(slides, event.previousIndex, event.currentIndex);
    this.active.setSlides();
  }

  ngOnDestroy() {
    this.active.clear();
    this.controls.navControls.set(false);
    this.loadSlideshow$?.unsubscribe();
    this.editSlideshow$?.unsubscribe();
  }
}
