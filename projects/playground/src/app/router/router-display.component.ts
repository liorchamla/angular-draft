import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from './router.service';

@Component({
  selector: 'router-display',
  template: ` <ng-container #routerDisplay></ng-container> `,
})
export class RouterDisplayComponent {
  @ViewChild('routerDisplay', { read: ViewContainerRef })
  routerDisplay?: ViewContainerRef;

  constructor(private router: Router) {}

  ngOnInit() {}

  renderComponent() {
    const componentToDisplay = this.router.getComponentToRender();

    if (!componentToDisplay) {
      return;
    }

    this.routerDisplay?.clear();
    this.routerDisplay?.createComponent(componentToDisplay);
  }

  ngAfterViewInit() {
    window.addEventListener('popstate', () => {
      this.renderComponent();
    });

    this.renderComponent();
  }
}
