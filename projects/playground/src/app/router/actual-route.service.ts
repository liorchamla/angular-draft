import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Route, Routes } from './router.service';

export class ActualRoute {
  route$ = new EventEmitter<Route | undefined>();
  currentRoute?: Route;

  constructor(private routes: Routes = []) {
    window.addEventListener('popstate', () => {
      const currentRoute = this.getActualRoute();

      if (currentRoute?.path === this.currentRoute?.path) {
        return;
      }

      this.currentRoute = currentRoute;
      this.route$.emit(this.currentRoute);
    });
  }

  getActualRoute() {
    return this.routes.find((route) => route.path === window.location.pathname);
  }
}
