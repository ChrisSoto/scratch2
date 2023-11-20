import { CdkConnectedOverlay, ConnectedPosition, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Block, BlockTypes } from '../models/block.model';


@Component({
  selector: 'be-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss']
})
export class AddBlockComponent implements OnInit {

  @Input() buttonMode: boolean = false;
  @Input() index: number;
  @Output() addBlockChange = new EventEmitter<Block>();

  private _editorOpen$: BehaviorSubject<boolean>;
  private _backDropSub$$: Subscription;

  @ViewChild(CdkConnectedOverlay, { static: true })
  private _connectedOverlay: CdkConnectedOverlay;

  public scrollStrategy: ScrollStrategy;
  public positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'center',
      overlayX: 'center',
      overlayY: 'center'
    }
  ];

  constructor(private _scroll: ScrollStrategyOptions) {
      this._editorOpen$ = new BehaviorSubject<boolean>(false);
    }

  ngOnInit(): void {
    this.scrollStrategy = this._scroll.block();
    this._backDropSub$$ = this._connectedOverlay.backdropClick
      .subscribe(res => {
        this._editorOpen$.next(false);
      })
  }

  get editorOpen$(): Observable<boolean> {
    return this._editorOpen$.asObservable();
  }

  addBlock(block: BlockTypes) {
    let timeout = setTimeout(() => {
      this._editorOpen$.next(false);
      this.addBlockChange.emit({ type: block, order: this.index, data: '' });
      clearTimeout(timeout);
    }, 150);
  }

  openEditor() {
    this._editorOpen$.next(true);
  }

  ngOnDestroy() {
    this._backDropSub$$.unsubscribe()
  }

}
