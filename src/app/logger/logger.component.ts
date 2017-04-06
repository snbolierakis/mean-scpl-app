import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserlogService } from '../services/index';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

message: any;
//@Output() notify: EventEmitter<string> = new EventEmitter<string>();

constructor(private userlogService: UserlogService) { }

ngOnInit() {
    this.userlogService.getMessage().subscribe(message => { this.message = message; });
}

close(){

 //this.notify.emit('in');
 this.message = null;


}
}
