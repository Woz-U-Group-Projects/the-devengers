import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupUserData: User = new User();

  constructor(private usersService: UsersService, private router: Router) { }

  onSignup(): void {
    this.usersService.signupUser(this.signupUserData).subscribe( () => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
