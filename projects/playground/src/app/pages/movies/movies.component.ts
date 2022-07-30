import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map,
  Subscription,
  switchMap,
  take,
  tap,
  throttleTime,
} from 'rxjs';
import { Genres, Movies, MoviesService } from '../../api/movies.service';
import { ScrollObserver } from '../../utils/scroll-observer';

@Component({
  selector: 'app-movies',
  template: `
    <a class="movie" routerLink="/movies/{{ m.id }}" *ngFor="let m of movies">
      <article>
        <h3>{{ m.title }}</h3>
        <img src="{{ m.poster }}" alt="" />

        <span *ngFor="let id of m.genres">{{ getGenreLabel(id) }}</span>
      </article>
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      a.movie {
        width: 22%;
        margin-right: 10px;
      }

      a.movie h3 {
        font-size: 1em;
        margin: 0;
      }

      a.movie img {
        margin: 10px 0;
      }

      a.movie span {
        padding: 5px 5px;
        background: #eee;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 0.7em;
        display: inline-block;
      }
    `,
  ],
})
export class MoviesComponent implements OnInit {
  movies: Movies = [];
  genres: Genres = [];
  currentPage = 1;

  scrollSubscription?: Subscription;

  getGenreLabel(id: number) {
    return this.genres.find((g) => g.id === id)?.name;
  }

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    forkJoin([
      this.moviesService.getMovieGenres(),
      this.moviesService.getPopularMovies(),
    ]).subscribe(([genres, movies]) => {
      this.movies = movies;
      this.genres = genres;
    });

    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        tap((_) => console.log('Hello')),
        map(() => this.isScrollAtTheBottom()),
        distinctUntilChanged(),
        filter((isBottom) => isBottom === true),
        switchMap(() => this.moviesService.getPopularMovies(++this.currentPage))
      )
      .subscribe((movies) => {
        this.movies.push(...movies);
      });
  }

  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
  }

  isScrollAtTheBottom() {
    return (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 100
    );
  }
}
