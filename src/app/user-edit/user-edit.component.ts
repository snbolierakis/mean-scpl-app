import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../models/index';
import { AlertService, UserService } from '../services/index';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

model : User = new User("","",{firstName: "", lastName:""});
loading = false;
hasError = false;
roles = ['Member', 'Client', 'Owner', 'Admin'];
language = ['Eng', 'Gr', 'Rom'];

constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

ngOnInit(){
  var temp = JSON.parse(localStorage.getItem('currentUser'));
  this.model = temp.user;
  }

register() {
    console.log("In registeruser");
    console.log(this.model);
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
                  console.log(error);
                  this.alertService.error(res.message);
                  this.loading = false;
                  this.hasError = true;

            });
}

removeError(){
  this.hasError = false;
}

}
