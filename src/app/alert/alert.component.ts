import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AlertService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;
    //@Output() notify: EventEmitter<string> = new EventEmitter<string>();

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    close(){

     //this.notify.emit('in');
     this.message = null;


    }
}
