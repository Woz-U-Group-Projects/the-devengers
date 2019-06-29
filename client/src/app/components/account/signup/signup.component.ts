import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsersService } from "../../../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();

  constructor(private usersService: UsersService, private router: Router) { }

  signup(): void {
    this.usersService.signupUser(this.user).subscribe(()=> {
      this.router.navigate(["/login"]);
    })
  }

  ngOnInit() {
  }

}
