import { Component, OnInit} from '@angular/core';
import { Post } from '../../models/post';
import { PostsService } from '../../posts.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post = new Post();

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  onCreate() {
    this.postsService.createPosts(this.post).subscribe(
      post => {
        this.post = post;
      }
    );
  }

}
