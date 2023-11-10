import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-base-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './life-home.component.html',
  styleUrls: ['./life-home.component.scss']
})
export class LifeHomeComponent {

}
