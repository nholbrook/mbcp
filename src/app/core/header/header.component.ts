import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

import { filter } from 'rxjs/operators';
import { AmplifyService } from 'aws-amplify-angular';
import { Storage, Auth } from 'aws-amplify';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileImageUrl: string;
  url: string;
  username: string;
  password: string;

  constructor(
    private amplify: AmplifyService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.url = this.router.url;
      });

    this.amplify.authStateChange$.subscribe(authState => {
      if (authState.state === 'signedIn') {
        Storage.get('nickholbrook.jpg', { level: 'public' }).then(data => {
          console.log(data);
          this.profileImageUrl = JSON.stringify(data); //this.sanitizer.bypassSecurityTrustUrl(data);
        });
      } else {
        this.profileImageUrl = '';
      }
    });
  }

  login() {
    this.authService.login(this.username, this.password);
  }

  logout() {
    this.authService.logout();
  }
}
