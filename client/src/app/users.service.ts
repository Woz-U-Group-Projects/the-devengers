import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersService {

  options = { withCredentials: true };

  constructor(private http: HttpClient, private router: Router) { }



  signupUser(user: User) {
    return this.http.post<{token: string}>('http://localhost:3001/users/signup', user, this.options)
    .subscribe( response => {
      localStorage.setItem('token', response.token);
      console.log(response);
      },
        err => console.log(err)
    );
  }

  loginUser(user: User) {
    this.http.post<{token: string}>('http://localhost:3001/users/login', user, this.options)
    .subscribe(response => {
      localStorage.setItem('token', response.token);
      console.log(response);
    },
    err => console.log(err)
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getProfile(): Observable<User> {
    return this.http.get<User>('http://localhost:3001/users/profile', this.options);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/posts']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3001/users/validateToken', this.options);
  }
}
