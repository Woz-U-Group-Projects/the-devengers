import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>('http://localhost:3001/posts');
  }

  createPosts(post: Post) {
    return this.http.post<Post>('http://localhost:3001/posts', post);
  }
}


