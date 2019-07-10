import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(public usersService: UsersService) {

  }

  ngOnInit() {

  }
}
