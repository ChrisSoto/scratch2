import { AfterViewChecked, Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { debounceTime, fromEvent, throttleTime } from 'rxjs';

@Directive({
  selector: '[makeSquare]',
  standalone: true
})
export class MakeSquareDirective implements OnInit, AfterViewChecked {

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private domElement = this.el.nativeElement as HTMLElement;

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(500),
        debounceTime(550),
      )
      .subscribe(_ => {
        this.makeSquare();
      });
  }

  private makeSquare() {
    const parent = this.domElement.parentElement;
    if (!parent) return;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    // take smaller
    const smaller = width > height ? height : width;
    this.renderer.setStyle(this.domElement, 'width', `${smaller * 1.2}px`);
    this.renderer.setStyle(this.domElement, 'height', `${smaller * 0.9}px`);
  }

  ngAfterViewChecked(): void {
    this.makeSquare();
  }

}
