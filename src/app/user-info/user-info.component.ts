import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() user: any;
  isEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  enableVisibility(){
    this.isEnabled = !this.isEnabled;
    return false;
  }

}
