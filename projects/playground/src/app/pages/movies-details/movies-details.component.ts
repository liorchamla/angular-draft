import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieDetail, MoviesService } from '../../api/movies.service';

@Component({
  selector: 'app-movies-details',
  template: `
    <ng-container *ngIf="movie">
      <div
        class="movie-detail"
        [ngStyle]="{ backgroundImage: 'url(' + movie.backdrop + ')' }"
      >
        <h2>{{ movie.title }}</h2>
        <h3>{{ movie.tagline }}</h3>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .movie-detail {
        padding: 3em;
        background-size: cover;
        background-position: center;
      }
    `,
  ],
})
export class MoviesDetailsComponent implements OnInit {
  movie?: MovieDetail;

  constructor(private route: ActivatedRoute, private service: MoviesService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getMovie(id).subscribe((movie) => (this.movie = movie));
  }
}
