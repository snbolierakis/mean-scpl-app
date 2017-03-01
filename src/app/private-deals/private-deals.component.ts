import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DealsService, AuthenticationService } from '../services/index';



@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.css']
})
export class PrivateDealsComponent implements OnInit {
  deals: any;
  constructor(private dealsService: DealsService) { }

  ngOnInit() {


  }
  getDeals(){
  this.dealsService.getDeals();
  this.deals = this.dealsService.data;
  console.log(this.deals);
return this.deals;
  }
}
