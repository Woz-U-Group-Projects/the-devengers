import { Component, OnInit, Input } from '@angular/core';
import { ContentData } from '../../models/content-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: ContentData[];
  @Input() dataPath: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<ContentData[]>(this.dataPath).subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }

}
