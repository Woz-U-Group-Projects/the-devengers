import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  options = { withCredentials: true };
  usersUrl: string = "http://localhost:3001/users/";
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  signupUser(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrl + "signup", user, this.options);
  }

  loginUser(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrl + "login", user, this.options);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.usersUrl + "profile", this.options);
  }

  logout(): Observable<string> {
    return this.http.get<string>(this.usersUrl + "logout", this.options);
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(this.usersUrl + "validateToken", this.options);
  }
}
