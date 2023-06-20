import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatBottomSheetModule,
  ],
  templateUrl: './weldmac-menu.component.html',
  styleUrls: ['./weldmac-menu.component.scss']
})
export class WeldmacMenuComponent {

  bottomSheetRef = inject(MatBottomSheetRef)

  openLink(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
