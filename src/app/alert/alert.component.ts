import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AlertService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    close(){
    // Mallon kalutera na kleinei apu8eias
     this.notify.emit('in');
     //let timeoutId = setTimeout(() => {
      this.message = null;
     //}, 7999);

    }
}
