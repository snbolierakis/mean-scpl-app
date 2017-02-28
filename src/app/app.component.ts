import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  currentUser: {};

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
    userIsLogged(){
        this.currentUser = localStorage.getItem('currentUser');
        console.log(this.currentUser);
        return this.currentUser != null;
    }

}
