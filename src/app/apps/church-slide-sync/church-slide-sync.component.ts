import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';

@Component({
  selector: 'app-church-slide-sync',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './church-slide-sync.component.html',
  styleUrls: ['./church-slide-sync.component.scss']
})
export class ChurchSlideSyncComponent {
  constructor() {
  }
}
