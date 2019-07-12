import { Component, OnInit} from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(public usersService: UsersService,
              private router: Router) {

  }

  ngOnInit() {

  }

  logoutUser() {
    this.usersService.logoutUser().subscribe(() => {
      this.usersService.loggedIn();
      this.router.navigate(['/posts']);
    });
  }
}
