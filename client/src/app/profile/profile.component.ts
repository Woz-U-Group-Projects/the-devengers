import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getProfile().subscribe(
      response => this.user = response);
    console.log(this.user);
  }

}
