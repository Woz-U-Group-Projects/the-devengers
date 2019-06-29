import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { FootageComponent } from './components/footage/footage.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/account/login/login.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';

import { UsersService } from './services/users.service';
import { SignupComponent } from './components/account/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './components/account/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FootageComponent,
    PostsComponent,
    LoginComponent,
    SubscribeComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
