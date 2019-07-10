import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.usersService.loginUser(this.user).subscribe(() => {
      this.usersService.getProfile().subscribe(() => {
        this.usersService.loggedIn = true;
        this.router.navigate(['/profile']);
      });
    });
  }
}
