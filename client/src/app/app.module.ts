import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BodyComponent } from './components/body/body.component';
import { FootageComponent } from './components/footage/footage.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/account/login/login.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    FootageComponent,
    NavigationComponent,
    PostsComponent,
    LoginComponent,
    SubscribeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
