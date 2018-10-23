//Internal
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Misc
import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { routing } from './core.routes';

//Modules
import { UserModule } from '../modules/user/user.module';
import { HomeModule } from '../modules/home/home.module';
import { ContentModule } from '../modules/content/content.module';
import { NewTripModule } from '../modules/new-trip/new-trip.module';
import { LoginModule } from '../modules/login/login.module';

//Services
import { FeedService } from './http/feed.service';
import { PostService } from './http/post.service';
import { TripService } from './http/trip.service';

//Auth
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from './guards/auth-guard.service';

//External
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
    NewTripModule,
    HttpClientModule,
    AmplifyAngularModule,
    LoginModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    FeedService,
    PostService,
    TripService,
    HttpClient,
    AmplifyService,
    AuthService,
    AuthGuard,
    CookieService
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule {}
