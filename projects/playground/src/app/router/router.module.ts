import { ModuleWithProviders, NgModule } from '@angular/core';
import { CustomersComponent } from '../pages/customers.component';
import { LoginComponent } from '../pages/login.component';
import { RegisterComponent } from '../pages/register.component';
import { ActualRoute } from './actual-route.service';
import { LinkDirective } from './link.directive';
import { RouterDisplayComponent } from './router-display.component';
import { Router, Routes } from './router.service';

@NgModule({
  declarations: [LinkDirective, RouterDisplayComponent],
  exports: [RouterDisplayComponent, LinkDirective],
})
export class RouterModule {
  static configure(routes: Routes): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RouterModule,
      providers: [
        {
          provide: Router,
          useFactory: () => {
            return new Router(routes);
          },
        },
        {
          provide: ActualRoute,
          useFactory: () => {
            return new ActualRoute(routes);
          },
        },
      ],
    };
  }
}
