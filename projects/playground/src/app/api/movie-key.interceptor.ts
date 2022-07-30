import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class MovieKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('https://api.themoviedb.org/3/')) {
      let newUrl = req.url;

      let separator = '?';

      if (newUrl.includes('?')) {
        separator = '&';
      }

      newUrl +=
        separator + 'api_key=e7358884149e833a956ccfdb6719b9ff&language=fr-FR';

      const newRequest = req.clone({
        url: newUrl,
      });

      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}
