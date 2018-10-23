import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

import { filter } from 'rxjs/operators';
import { AmplifyService } from 'aws-amplify-angular';
import { Storage, Auth } from 'aws-amplify';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileImageUrl: any;
  url: string;
  username: string;
  password: string;
  authState: string;

  constructor(
    private amplify: AmplifyService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.amplify.authStateChange$.subscribe(authState => {
      this.authState = authState['state'];
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(data => {
      if (data['url'] != '/') {
        if (this.authState == 'signedIn') {
          Storage.get(this.cookieService.get('username') + '.jpg', { level: 'public' }).then(
            data => {
              this.profileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
            }
          );
        } else {
          this.profileImageUrl = '';
        }
      }
      this.url = this.router.url;
    });
  }

  login() {
    this.authService.login(this.username, this.password);
  }

  logout() {
    this.authService.logout();
  }
}
