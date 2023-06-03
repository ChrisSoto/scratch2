import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ScreenHeightService } from '../shared/services/screen-height.service';
import { ToolbarService } from '../shared/services/toolbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private toolbar = inject(ToolbarService);
  constructor() {
    this.toolbar.showToolbar();
  }
}
