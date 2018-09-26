import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';

import { routing } from './core.routes';

import { UserModule } from '../modules/user/user.module';
import { HomeModule } from '../modules/home/home.module';
import { ContentModule } from '../modules/content/content.module';

import { FeedService } from './http/feed.service';
import { PostService } from './http/post.service';
import { AuthService } from './authentication/auth.service';
import { LoginModule } from '../modules/login/login.module';
import { AuthGuard } from './guards/auth-guard.service';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { CookieService } from 'ngx-cookie-service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CoreComponent, HeaderComponent],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    HomeModule,
    ContentModule,
    HttpClientModule,
    AmplifyAngularModule,
    LoginModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    FeedService,
    PostService,
    HttpClient,
    AmplifyService,
    AuthService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule {}
