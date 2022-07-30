import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

export type Movie = {
  id: number;
  title: string;
  poster: string;
  genres: number[];
  rating: number;
};

export type Movies = Movie[];

export type ApiMovie = {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
};

export type MovieDetail = {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  genres: Genre[];
  rating: number;
  overview: string;
  homepage: string;
  tagline: string;
  runtime: number;
};

export type ApiMovieDetails = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  vote_average: number;
  homepage: string;
  overview: string;
  tagline: string;
  runtime: number;
};

export type ApiMovies = ApiMovie[];

export type ApiMoviesResponse = {
  results: ApiMovies;
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = Genre[];

export type ApiGenresResponse = {
  genres: Genres;
};

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovie(id: number) {
    return this.http
      .get<ApiMovieDetails>('https://api.themoviedb.org/3/movie/' + id)
      .pipe(
        map((data) => {
          return {
            id: data.id,
            title: data.title,
            overview: data.overview,
            rating: data.vote_average,
            poster: 'https://image.tmdb.org/t/p/w500/' + data.poster_path,
            backdrop:
              'https://image.tmdb.org/t/p/original/' + data.backdrop_path,
            tagline: data.tagline,
          } as MovieDetail;
        })
      );
  }

  getPopularMovies(page = 1): Observable<Movies> {
    return this.http
      .get<ApiMoviesResponse>(
        'https://api.themoviedb.org/3/movie/popular?page=' + page
      )
      .pipe(
        map((apiResponse) => apiResponse.results),
        map((results) => {
          return results.map((m) => {
            return {
              title: m.title,
              genres: m.genre_ids,
              id: m.id,
              rating: m.vote_average,
              poster: 'https://image.tmdb.org/t/p/w500/' + m.poster_path,
            } as Movie;
          });
        })
      );
  }

  getMovieGenres() {
    return this.http
      .get<ApiGenresResponse>('https://api.themoviedb.org/3/genre/movie/list')
      .pipe(map((response) => response.genres));
  }
}
