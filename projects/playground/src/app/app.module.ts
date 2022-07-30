import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesDetailsComponent } from './pages/movies-details/movies-details.component';
import { MoviesService } from './api/movies.service';
import { MovieKeyInterceptor } from './api/movie-key.interceptor';
import { ScrollObserver } from './utils/scroll-observer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    MoviesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Connexion' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Inscription' },
      },
      { path: '', component: MoviesComponent, data: { title: 'Les films' } },
      { path: 'movies/:id', component: MoviesDetailsComponent },
    ]),
  ],
  providers: [
    MoviesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MovieKeyInterceptor,
      multi: true,
    },
    ScrollObserver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
