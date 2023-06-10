import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable, filter, mergeMap } from 'rxjs';
import { ChurchSlideshowService } from '../../services/church-slideshow.service';
import { ChurchSlideType } from '../../interface/ChurchSlideshow.interface';
import { CommonSelectComponent } from 'src/app/shared/components/common-select/common-select.component';
import { ChurchSlideTypeEditComponent } from '../church-slide-type-edit/church-slide-type-edit.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-church-slide-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonSelectComponent,
    ChurchSlideTypeEditComponent,
    DragDropModule,
  ],
  templateUrl: './church-slide-edit.component.html',
  styleUrls: ['./church-slide-edit.component.scss']
})
export class ChurchSlideEditComponent {
  active = inject(ActiveChurchSlideshowService);
  slideshowService = inject(ChurchSlideshowService);
  route = inject(ActivatedRoute);

  loadSlideshow$!: Unsubscribable;

  slideOptions: ChurchSlideType[] = [
    'HYMN', 'IMAGE', 'TEXT', 'EMPTY'
  ];

  ngOnInit() {
    this.loadSlideshow();
  }

  onAddOptionChange(slideType: ChurchSlideType | null) {
    const slide = slideType as ChurchSlideType;
    this.active.addSlide(slide);
  }

  loadSlideshow() {
    this.loadSlideshow$ = this.route.paramMap
      .pipe(
        filter(params => params.has('id')),
        mergeMap((params) => {
          const id = params.get('id') as string;
          return this.slideshowService.observe(id);
        }),
      )
      .subscribe((slideshow) => {
        if (slideshow) {
          console.log(slideshow)
          this.active.setSlideshow(slideshow);
        }
      });
  }

  move(event: CdkDragDrop<string[]>) {
    let slides = this.active.slides$.value;
    moveItemInArray(slides, event.previousIndex, event.currentIndex);
    // this.active.setSlides(slides);
  }

  ngOnDestroy() {
    this.active.clear();
    this.loadSlideshow$.unsubscribe();
  }
}
