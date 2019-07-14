import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { UsersService } from './users.service';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostsService } from './posts.service';
import { AuthGuard } from './auth.guard';
import { PostComponent } from './posts/post/post.component';
import { BlogComponent } from './posts/blog/blog.component';
import { FootageComponent } from './footage/footage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PostComponent,
    BlogComponent,
    FootageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UsersService,
    PostsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
