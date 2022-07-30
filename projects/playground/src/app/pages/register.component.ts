import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualRoute } from '../router/actual-route.service';

@Component({
  selector: 'register',
  template: ` <h2>Inscription</h2> `,
})
export class RegisterComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.data);
  }
}
