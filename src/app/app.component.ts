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
  currentUser: any={};
  profile: any={};
  constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
    }
    userIsLogged(){
      this.currentUser = this.authenticationService.loggedIn();
      return this.currentUser != null;
    }

    getUserName(){
        if(this.currentUser == null){
            return "";
        }
        else {

        //  console.log(this.currentUser.user);

          return this.currentUser.user.profile.firstName;
        }
    }

    userIsAdmin(){
        if(this.currentUser != null){
          return this.currentUser.user.role == 'Admin';
        }
        return false;
    }
    logout(){
      this.authenticationService.logout();
    }

}
