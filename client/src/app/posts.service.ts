import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Post } from './models/post';
=======
>>>>>>> master

@Injectable({
  providedIn: 'root'
})
export class PostsService {

<<<<<<< HEAD

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>('http://localhost:3001/posts');
  }

  createPosts(post: Post) {
    return this.http.post<Post>('http://localhost:3001/posts', post);
=======
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>('http://localhost:3001/users/posts'); // returns array of posts
>>>>>>> master
  }
}


