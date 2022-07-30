import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  createComponentFactory,
  createHttpFactory,
  Spectator,
  SpectatorHttp,
  SpyObject,
} from '@ngneat/spectator';
import { of } from 'rxjs';
import { Movies, MoviesService } from '../../api/movies.service';
import { ScrollObserver } from '../../utils/scroll-observer';
import { MoviesComponent } from './movies.component';

const MOCK_DATA: Movies = [
  {
    id: 1,
    title: 'MOCK_TITLE_1',
    poster: 'mock_url',
    rating: 3,
    genres: [1, 2],
  },
  {
    id: 2,
    title: 'MOCK_TITLE_2',
    poster: 'mock_url',
    rating: 3,
    genres: [1, 2],
  },
];

const fakeService = {
  getPopularMovies(page: number) {
    return of(MOCK_DATA);
  },
  getMovieGenres() {
    return of([]);
  },
};

describe('MoviesComponent', () => {
  let spectator: Spectator<MoviesComponent>;

  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [RouterModule.forRoot([])],
    providers: [
      {
        provide: MoviesService,
        useValue: fakeService,
      },
      ScrollObserver,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should display movies', () => {
    // const fetchSpy = spyOn(window, 'fetch');
    // fetchSpy.and.returnValue(
    //   Promise.resolve({
    //     json() {
    //       return Promise.resolve({
    //         results: [
    //           { title: 'MOCK_TITLE_1', id: 1 },
    //           { title: 'MOCK_TITLE_2', id: 2 },
    //         ],
    //       });
    //     },
    //   } as Response)
    // );
    // spectator = createComponent();
    // tick();
    // spectator.detectChanges();
    // expect(spectator.queryAll('.movie')).toHaveLength(2);
    // expect(fetchSpy).toHaveBeenCalled();
    // const req = httpController.expectOne(
    //   'https://api.themoviedb.org/3/movie/popular?api_key=e7358884149e833a956ccfdb6719b9ff&language=fr-FR&page=1'
    // );
    // expect(spectator.queryAll('.movie')).toHaveLength(0);
    // req.flush({
    //   results: [
    //     { title: 'MOCK_MOVIE_1', id: 1, poster_path: 'mock_image' },
    //     { title: 'MOCK_MOVIE_2', id: 2, poster_path: 'mock_image' },
    //   ],
    // });
    // spectator.detectChanges();
    // expect(spectator.queryAll('.movie')).toHaveLength(2);

    spectator.component.ngOnInit();

    expect(spectator.queryAll('.movie')).toHaveLength(2);
  });

  it('should load more movies when scroll hits the bottom', fakeAsync(() => {
    const spy = spyOn(fakeService, 'getPopularMovies').and.returnValue(
      of(MOCK_DATA)
    );

    window.dispatchEvent(new Event('scroll', {}));

    tick();

    expect(spy).toHaveBeenCalled();
  }));
});
