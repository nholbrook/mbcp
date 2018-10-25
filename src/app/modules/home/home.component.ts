import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { FeedService } from '../../core/http/feed.service';
import { PostService } from '../../core/http/post.service';
import { AuthService } from '../../core/authentication/auth.service';

import { Storage, Auth } from 'aws-amplify';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  route = 'Test';
  items = [];
  featuredImageUrl = '';
  profileImageUrl: any;
  profileUsername = '';
  profileName = '';

  content = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedService,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.url.join();

    this.feedService.getData().subscribe(data => {
      this.items = data['rows'];
      console.log(data['rows']);
    });

    Storage.get(this.cookieService.get('username') + '-featured.jpg', {
      level: 'public'
    }).then(data => {
      console.log(data);
      this.featuredImageUrl = JSON.stringify(data);
    });

    Storage.get(this.cookieService.get('username') + '.jpg', {
      level: 'public'
    }).then(data => {
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        data as string
      );
    });

    this.profileUsername = this.cookieService.get('username');
    this.profileName = this.cookieService.get('name');
  }

  createPost() {
    this.postService.createPost(this.content).subscribe(res => {
      console.log(res);
      this.feedService.getData().subscribe(data => {
        this.content = '';
        this.items.unshift(data['feed'][0]);
        console.log(this.items);
      });
    });
  }

  trustURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://s3-us-west-2.amazonaws.com/mbcpf83ce0fbc3b2439d90078e3b9c0b0d5e/public/dunes.jpg'
    );
  }

  getDisplayDate(date: string) {
    var date: string;
    var d1 = new Date();
    var utcDate = d1.toUTCString();
    var d2 = new Date(date); //('2018-10-23 21:27:06+0000');
    var timeDiff = Math.abs(d1.getTime() - d2.getTime());

    if (timeDiff > 30 * 24 * 60 * 60 * 1000) {
      switch (d2.getUTCMonth()) {
        case 0:
          return 'Jan ' + d2.getUTCDate();
        case 1:
          return 'Feb ' + d2.getUTCDate();
        case 2:
          return 'Mar ' + d2.getUTCDate();
        case 3:
          return 'Apr ' + d2.getUTCDate();
        case 4:
          return 'May ' + d2.getUTCDate();
        case 5:
          return 'Jun ' + d2.getUTCDate();
        case 6:
          return 'Jul ' + d2.getUTCDate();
        case 7:
          return 'Aug ' + d2.getUTCDate();
        case 8:
          return 'Sep ' + d2.getUTCDate();
        case 9:
          return 'Oct ' + d2.getUTCDate();
        case 10:
          return 'Nov ' + d2.getUTCDate();
        case 11:
          return 'Dec ' + d2.getUTCDate();
        default:
          return d2.toUTCString();
      }
    } else if (
      timeDiff <= 30 * 24 * 60 * 60 * 1000 &&
      timeDiff > 23 * 60 * 60 * 1000
    ) {
      return Math.ceil(timeDiff / (24 * 1000 * 60 * 60)) + 'd';
    } else if (timeDiff <= 23 * 60 * 60 * 1000 && timeDiff > 60 * 60 * 1000) {
      return Math.ceil(timeDiff / (1000 * 60 * 60)) + 'h';
    } else if (timeDiff <= 60 * 60 * 1000 && timeDiff > 60 * 1000) {
      return Math.ceil(timeDiff / (1000 * 60)) + 'm';
    } else if (timeDiff <= 60 * 1000 && timeDiff > 1000) {
      return Math.ceil(timeDiff / 1000) + 's';
    } else if (timeDiff <= 1000) {
      return '1s';
    } else {
      return '-1';
    }
  }
}
