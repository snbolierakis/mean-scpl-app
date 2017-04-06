import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AfterViewInit, ViewChild } from '@angular/core';
import { LoggerComponent } from '../logger/logger.component';

import { Router } from '@angular/router';
import { User } from '../models/index';
import { UserlogService, UserService } from '../services/index';
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
@ViewChild(LoggerComponent)
private logger: LoggerComponent;
logs: any = [];
state = 'in';
currUser : any = null;
users: any = [];
socket = io('/my-namespace');

constructor(
    private router: Router,
    private userService: UserService,
    private userlogService: UserlogService) { }

ngOnInit(){
  this.reqLoop();
  this.addMessage();
}
ngOnDestroy(){
  this.socket.off('hi');
}
handleUserUpdated(user){
  this.currUser = user;
  //console.log(this.currUser);
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

   this.socket.on('hi',function(data){
       this.logs.push(data);
       this.reqLoop();
       setTimeout(() => {
        this.userlogService.success(data, true);
        this.state = 'active';
        setTimeout(() => {

           this.state = "in";
           setTimeout(() => {
             this.logger.close();
             this.logs.pop(data);
           },500);

        }, 3500);
       }, 4000 * (this.logs.length - 1));




   }.bind(this));
}

}
