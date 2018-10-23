import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Storage } from 'aws-amplify';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  route = 'Test';
  username = '';
  featuredImageUrl = '';
  profileImageUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.url.join();
    this.username = this.router.url.split('/')[2];

    Storage.get(this.username + '-featured.jpg', { level: 'public' }).then(data => {
      this.featuredImageUrl = JSON.stringify(data);
    });

    Storage.get(this.username + '.jpg', { level: 'public' }).then(data => {
      this.profileImageUrl = JSON.stringify(data);
    });
  }
}
