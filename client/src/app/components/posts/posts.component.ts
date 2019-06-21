import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  users: UserData[];
  @Input() dataPath: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<UserData[]>(this.dataPath).subscribe(users => {
      this.users = users;
    })
  }

}
