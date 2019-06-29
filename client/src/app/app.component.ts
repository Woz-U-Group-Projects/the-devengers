import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private usersService: UsersService) {

  }

  ngOnInit () {
    this.usersService.validateToken().subscribe(response => {
      this.usersService.loggedIn = response;
    })
  }
}
