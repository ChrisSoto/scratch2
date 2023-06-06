import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ChurchSlideshowService } from '../../services/church-slideshow.service';
import { ChurchSlideType, ChurchSlideshow } from '../../interface/ChurchSlideshow.interface';
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

  slideOptions: ChurchSlideType[] = [
    'HYMN', 'IMAGE', 'TEXT', 'EMPTY'
  ];

  ngOnInit() {
    // if the edit page is refreshed, active slideshow loses the active slideshow
    if (!this.active.slideshow$.value) {
      this.loadSlideshow();
    }
  }

  onAddOptionChange(slideType: ChurchSlideType | null) {
    const slide = slideType as ChurchSlideType;
    this.active.addSlide(slide);
  }

  loadSlideshow() {
    this.route.paramMap
      .pipe(
        mergeMap((params) => {
          if (params.has('id')) {
            const id = params.get('id') as string;
            return this.slideshowService.read(id);
          } else {
            return of(null);
          }
        }),
        map((data) => {
          if (data && data.exists()) {
            return data.data() as ChurchSlideshow;
          } else {
            return null;
          }
        })
      )
      .subscribe((slideshow) => {
        if (slideshow) {
          this.active.setSlideshow(slideshow);
        }
      })
  }

  move(event: CdkDragDrop<string[]>) {
    let slides = this.active.slides$.value;
    moveItemInArray(slides, event.previousIndex, event.currentIndex);
    // this.active.setSlides(slides);
  }

  ngOnDestroy() {
    this.active.clear();
  }
}
