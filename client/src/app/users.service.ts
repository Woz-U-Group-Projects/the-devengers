import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  options = { withCredentials: true };

  signupUser(user: User): Observable<string> {
    return this.http.post<string>('http://localhost:3001/users/signup', user, this.options);
  }

  loginUser(user: User): Observable<string> {
    return this.http.post<string>('http://localhost:3001/users/login', user, this.options);
  }

  loggedIn() {
    return !!document.cookie;
  }

  getProfile(): Observable<User> {
    return this.http.get<User>('http://localhost:3001/users/profile', this.options);
  }

  logoutUser(): Observable<string> {
    return this.http.get<string>('http://localhost:3001/users/logout', this.options);
  }


  validateToken(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3001/users/validateToken', this.options);
  }
}
