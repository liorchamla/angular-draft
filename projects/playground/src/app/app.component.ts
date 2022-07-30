import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="navigation">
        <h1>NgCRM</h1>
        <nav>
          <ul>
            <li><a routerLinkActive="active" routerLink="/login">Login</a></li>
            <li>
              <a routerLinkActive="active" routerLink="/register">Register</a>
            </li>
            <li><a routerLinkActive="active" routerLink="/">Movies</a></li>
          </ul>
        </nav>
      </div>

      <router-outlet></router-outlet>
    </div>

    <footer>
      <p>Copyright NGMovies</p>
    </footer>
  `,
  styles: [
    `
      .navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navigation h1 {
        margin: 0;
      }
      .active {
        font-weight: bold;
      }

      footer {
        padding: 3em;
        margin-top: 1em;
        background-color: #eee;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map((activationEndEvent: any) => activationEndEvent.snapshot.data)
      )
      .subscribe((data) => (document.title = data.title));
  }
}
