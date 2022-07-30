import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { MovieKeyInterceptor } from './movie-key.interceptor';

describe('MovieKeyInterceptor', () => {
  let spectator: SpectatorHttp<MovieKeyInterceptor>;

  const createHttp = createHttpFactory({
    service: MovieKeyInterceptor,
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        multi: true,
        useClass: MovieKeyInterceptor,
      },
    ],
  });

  beforeEach(() => (spectator = createHttp()));

  it('should add key and language to a request', () => {
    const http = spectator.httpClient;
    http.get('https://api.themoviedb.org/3/genre').subscribe();

    const req = spectator.expectOne(
      'https://api.themoviedb.org/3/genre?api_key=e7358884149e833a956ccfdb6719b9ff&language=fr-FR',
      HttpMethod.GET
    );

    req.flush('');
  });

  it('should use & as separator if needed', () => {
    const http = spectator.httpClient;
    http.get('https://api.themoviedb.org/3/genre?param=1').subscribe();

    const req = spectator.expectOne(
      'https://api.themoviedb.org/3/genre?param=1&api_key=e7358884149e833a956ccfdb6719b9ff&language=fr-FR',
      HttpMethod.GET
    );

    req.flush('');
  });
});
