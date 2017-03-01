import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class DealsService {
    data: any = null;

    constructor(private http: Http) { }

    getDeals() {
    var jwt = JSON.parse(localStorage.getItem('currentUser')).token;
    var authHeader = new Headers();
  if(jwt) {
    //console.log(jwt);
    authHeader.append('Authorization', jwt);
  }
  else{
    console.log("No jwt");
  }


this.http.get('http://localhost:3000/api/private', {
headers: authHeader
})
.map(res => res.json())
.subscribe(
data => this.data = data,
err => this.logError(err),
() => console.log('Secret Quote Complete')
);

return this.data;
}

    logError(err) {
  console.error('There was an error: ' + err);
}
}
