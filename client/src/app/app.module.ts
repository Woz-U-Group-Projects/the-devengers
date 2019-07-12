import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { UsersService } from './users.service';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostsService } from './posts.service';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PostsComponent
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
