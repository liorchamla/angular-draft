import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  createHttpFactory,
  createServiceFactory,
  HttpMethod,
  Spectator,
  SpectatorHttp,
  SpectatorService,
} from '@ngneat/spectator';
import { MovieKeyInterceptor } from './movie-key.interceptor';
import { ApiMoviesResponse, MoviesService } from './movies.service';

describe('MovieService with Http', () => {
  let spectator: SpectatorHttp<MoviesService>;

  const createHttp = createHttpFactory({
    service: MoviesService,
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MovieKeyInterceptor,
        multi: true,
      },
    ],
  });

  beforeEach(() => (spectator = createHttp()));

  it('should return a list of movies', () => {
    const API_DATA: ApiMoviesResponse = {
      results: [
        {
          id: 1,
          title: 'MOCK_TITLE_1',
          genre_ids: [1, 2],
          vote_average: 3,
          poster_path: 'MOCK_PATH',
        },
        {
          id: 2,
          title: 'MOCK_TITLE_2',
          genre_ids: [1, 2],
          vote_average: 3,
          poster_path: 'MOCK_PATH',
        },
      ],
    };

    spectator.service.getPopularMovies(2).subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0]).toEqual({
        id: 1,
        title: 'MOCK_TITLE_1',
        genres: [1, 2],
        rating: 3,
        poster: 'https://image.tmdb.org/t/p/w500/MOCK_PATH',
      });
    });

    const req = spectator.expectOne(
      'https://api.themoviedb.org/3/movie/popular?page=2&api_key=e7358884149e833a956ccfdb6719b9ff&language=fr-FR',
      HttpMethod.GET
    );

    req.flush(API_DATA);
  });
});

describe('MoviesService', () => {
  let spectator: SpectatorService<MoviesService>;
  let service: MoviesService;
  let httpController: HttpTestingController;

  const createService = createServiceFactory({
    service: MoviesService,
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        multi: true,
        useClass: MovieKeyInterceptor,
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpController = spectator.inject(HttpTestingController);
  });

  it('should return a list of movies', () => {
    const API_DATA: ApiMoviesResponse = {
      results: [
        {
          id: 1,
          title: 'MOCK_TITLE_1',
          genre_ids: [1, 2],
          vote_average: 3,
          poster_path: 'MOCK_PATH',
        },
        {
          id: 2,
          title: 'MOCK_TITLE_2',
          genre_ids: [1, 2],
          vote_average: 3,
          poster_path: 'MOCK_PATH',
        },
      ],
    };

    service.getPopularMovies(2).subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0]).toEqual({
        id: 1,
        title: 'MOCK_TITLE_1',
        genres: [1, 2],
        rating: 3,
        poster: 'https://image.tmdb.org/t/p/w500/MOCK_PATH',
      });
    });

    const req = httpController.expectOne(
      'https://api.themoviedb.org/3/movie/popular?page=2&api_key=e7358884149e833a956ccfdb6719b9ff&language=fr-FR'
    );

    req.flush(API_DATA);
  });
});
