import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/index';
import { Observable }         from "rxjs/Observable";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
    /*return IntervalObservable.create(2000).flatMap(
        () => {return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());});*/
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        console.log("In userService");
        console.log(user);
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
