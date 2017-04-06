import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService, UserService } from '../services/index';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() user: any;
  @Input() cuser: any;
  @Output() currentUser = new EventEmitter();
  isEnabled = false;

  constructor(private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  enableVisibility(){
    //console.log("CALLLLLL");
    this.currentUser.emit(this.user);
    this.isEnabled = !this.isEnabled;
    return false;
  }

  checkVisibility(){
    if(this.cuser!=null&&(this.cuser._id != this.user._id)) this.isEnabled = false;
    return (this.cuser!=null && (this.cuser._id == this.user._id))&&this.isEnabled;
  }

  deleteUser() {

      this.userService.delete(this.user._id)
          .subscribe(
              error => {

                    let res = error.json();
                    console.log(error);
                    this.alertService.error(res.message);

              });
              return false;
  }
}
