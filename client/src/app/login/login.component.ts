import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: User = new User();

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.usersService.loginUser(this.loginUserData);
    console.log(this.loginUserData);
    this.router.navigate(['/posts']);
  }
}
