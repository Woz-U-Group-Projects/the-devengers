import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersService {

  options = { withCredentials: true };
  loggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  signupUser(user: User) {
    this.http.post<string>(
      'http://localhost:3001/users/signup',
      user, this.options
      )
      .subscribe(response => {
        console.log(response);
      });
    this.router.navigate(['/login']);
  }

  loginUser(user: User): Observable<string> {
    return this.http.post<string>('http://localhost:3001/users/login', user, this.options);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>('http://localhost:3001/users/profile', this.options);
    this.router.navigate(['/profile']);
  }

  logout(): Observable<string> {
    return this.http.get<string>('http://localhost:3001/users/logout', this.options);
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3001/users/validateToken', this.options);
  }
}
