import { CdkConnectedOverlay, ConnectedPosition, OverlayModule, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, signal, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Block, BlockTypes } from '../models/block.model';
import { MatIconModule } from '@angular/material/icon';
import { BlockTypeMenuComponent } from '../block-type-menu/block-type-menu.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'be-add-block',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    BlockTypeMenuComponent,
  ],
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss']
})
export class AddBlockComponent implements OnInit {

  @Input() buttonMode: boolean = false;
  @Input() index!: number;
  @Output() addBlockChange = new EventEmitter<Block>();
  @ViewChild(CdkConnectedOverlay, { static: true })
  
  private connectedOverlay!: CdkConnectedOverlay;
  private backDropSub$$!: Subscription;
  private scroll = inject(ScrollStrategyOptions)
  public scrollStrategy = this.scroll.block();

  public positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'center',
      overlayX: 'center',
      overlayY: 'center'
    }
  ];

  public editorActive = signal(false);

  ngOnInit(): void {
    this.backDropSub$$ = this.connectedOverlay.backdropClick
      .subscribe(_ => {
        this.editorActive.set(false);
      })
  }

  addBlock(block: BlockTypes) {
    let timeout = setTimeout(() => {
      this.editorActive.set(false);
      this.addBlockChange.emit({ type: block, order: this.index, data: '' });
      clearTimeout(timeout);
    }, 150);
  }

  ngOnDestroy() {
    this.backDropSub$$.unsubscribe()
  }

}
