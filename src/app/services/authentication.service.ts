import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', { username, password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //console.log(user.userinfo);
                    console.log(JSON.stringify(user.userInfo));
                    localStorage.setItem('currentUser', JSON.stringify({token: user.token, user: user.userInfo, error: user.error}));

                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    loggedIn(){
        return JSON.parse(localStorage.getItem('currentUser'));
    
    }
}
