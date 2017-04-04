import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AfterViewInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

import { Router } from '@angular/router';
import { User } from '../models/index';
import { AlertService, UserService } from '../services/index';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  animations: [
  trigger('flyInOut', [

    transition('in => active', [
      style({transform: 'translateX(-100%)'}),
      animate(500)
    ]),
    transition('active => in', [
      animate(500, style({transform: 'translateX(100%)'}))
    ])
  ])
]
})
export class DeleteUserComponent implements OnInit {
@ViewChild(AlertComponent)
private alert: AlertComponent;
model : User = new User("","",{firstName: "", lastName:""});
loading = false;
logs: any = [];
numUsers = "mpla";
state = 'in';
finished = true;

hasError = false;
roles = ['Member', 'Client', 'Owner', 'Admin'];
users: any = [];
constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

ngOnInit(){
  this.reqLoop();
  this.addMessage();
}
reqLoop(){
this.userService.getAll()
  .subscribe(
    data =>{
      console.log(data);
      this.users = data;
    },
    error =>{
      console.log(error);
    }
  );
}

addMessage(){
var socket = io('/my-namespace');
   socket.on('hi',function(data){
       this.numUsers = "skara";
       this.logs.push(data);

       setTimeout(() => {
        this.alertService.success(data, true);
        this.state = 'active';
        setTimeout(() => {

           this.state = "in";
           setTimeout(() => {
             this.alert.close();
             this.logs.pop(data);
           },500);

        }, 3500);
       }, 4000 * (this.logs.length - 1));




   }.bind(this));
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

onNotify(state:string):void {
    this.state = state;
  }

removeError(){
  this.hasError = false;
}

}
