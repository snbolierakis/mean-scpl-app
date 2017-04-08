import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../models/index';
import { AlertService, UserService } from '../services/index';

@Component({
    selector: 'registerUser',
    moduleId: module.id,
    templateUrl: 'register-user.component.html'
})

export class RegisterUserComponent {
    model : User = new User("","",{firstName: "", lastName:""},"Member");
    loading = false;
    hasError = false;

    roles = ['Member', 'Client', 'Owner', 'Admin'];
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {

        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['']);
                },
                error => {

                      let res = error.json();
                      this.alertService.error(res.message);
                      this.loading = false;
                      this.hasError = true;

                });
    }

    removeError(){
      this.hasError = false;
    }

}
