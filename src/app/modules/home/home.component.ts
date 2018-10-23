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
      this.items = data['feed'];
      console.log(data['feed']);
    });

    Storage.get(this.cookieService.get('username') + '-featured.jpg', { level: 'public' }).then(
      data => {
        console.log(data);
        this.featuredImageUrl = JSON.stringify(data);
      }
    );

    Storage.get(this.cookieService.get('username') + '.jpg', { level: 'public' }).then(data => {
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data as string);
    });

    this.profileUsername = this.authService.username;
    this.profileName = this.authService.name;
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
}
