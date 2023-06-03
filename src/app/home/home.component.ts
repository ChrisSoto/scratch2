import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ScreenHeightService } from '../shared/services/screen-height.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  ngOnInit() {
    this.test()
  }

  test() {
    ({} as any).test();
  }
}
