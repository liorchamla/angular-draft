import { Component, EventEmitter, Type } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { ActualRoute } from './actual-route.service';

export type Route = {
  path: string;
  component: Type<any>;
  data?: { [key: string]: any };
};

export type Routes = Route[];

export class Router {
  actualRoute?: Route;
  routeChanged = new BehaviorSubject<Route | undefined>(undefined);

  dataChanged = this.routeChanged.pipe(
    distinctUntilChanged(),
    map((route) => route?.data)
  );

  constructor(private routes: Routes = []) {
    window.addEventListener('popstate', () => {
      console.log('PopState!');
      this.routeChanged.next(this.getActualRoute());
    });

    console.log("Je suis construit donc j'émet !");
    this.routeChanged.next(this.getActualRoute());
  }

  getActualRoute() {
    const path = window.location.pathname;

    return this.routes.find((route) => route.path === path);
  }

  getComponentToRender() {
    const componentToDisplay = this.getActualRoute()?.component;

    if (!componentToDisplay) {
      return;
    }

    return componentToDisplay;
  }

  navigateToUrl(path: string) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate', {}));
  }
}
