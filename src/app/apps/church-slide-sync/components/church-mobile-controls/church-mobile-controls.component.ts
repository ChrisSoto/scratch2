import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlideshowControlsService } from '../../services/slideshow-controls.service';
import { ActiveChurchSlideshowService } from '../../services/active-church-slideshow.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-church-mobile-controls',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './church-mobile-controls.component.html',
  styleUrl: './church-mobile-controls.component.scss',
})
export class ChurchMobileControlsComponent {
  controls = inject(SlideshowControlsService);
  active = inject(ActiveChurchSlideshowService);

  ngOnInit() {
    
  }
}
