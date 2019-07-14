import { Component, OnInit} from '@angular/core';
import { Post } from '../../models/post';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Post[];

  constructor(private http: HttpClient,
              private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }

}
