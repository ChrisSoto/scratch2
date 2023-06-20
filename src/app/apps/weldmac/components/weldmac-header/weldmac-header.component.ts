import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { WeldmacMenuComponent } from '../../dailogs/menu/weldmac-menu.component';

@Component({
  selector: 'weldmac-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule
  ],
  templateUrl: './weldmac-header.component.html',
  styleUrls: ['./weldmac-header.component.scss']
})
export class WeldmacHeaderComponent {
  @Input()
  title: string = 'Weldmac';

  bottomSheet = inject(MatBottomSheet);

  openMenu() {
    this.bottomSheet.open(WeldmacMenuComponent);
  }
}
