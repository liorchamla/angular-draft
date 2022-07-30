import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { Router } from './router.service';

@Directive({
  selector: 'a[link]',
})
export class LinkDirective {
  @Input('link')
  @HostBinding('href')
  value!: string;

  @Input('active-class')
  activeClass = '';

  @HostBinding('className')
  className?: string;

  @HostListener('click', ['$event'])
  onClickLink(event: MouseEvent) {
    this.router.navigateToUrl(this.value);
    event.preventDefault();
  }

  ngOnInit() {
    this.router.routeChanged.subscribe((route) => {
      if (!this.activeClass) {
        return;
      }

      this.className = this.className?.replace(this.activeClass, '');

      if (route?.path !== this.value) {
        return;
      }

      this.className += ' ' + this.activeClass;
    });
  }

  constructor(private router: Router) {}
}
