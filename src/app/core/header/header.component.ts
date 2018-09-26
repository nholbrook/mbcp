import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { AmplifyService } from 'aws-amplify-angular';
import { Storage, Auth } from 'aws-amplify';

import { AuthService } from '../authentication/auth.service';

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
    private auth: AuthService,
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
        Storage.get('pics/profile.png', { level: 'private' }).then(data => {
          console.log(data);
          this.profileImageUrl = JSON.stringify(data); //this.sanitizer.bypassSecurityTrustUrl(data);
        });
      } else {
        this.profileImageUrl = '';
      }
    });
  }

  login() {
    Auth.signIn(this.username, this.password)
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }
}
