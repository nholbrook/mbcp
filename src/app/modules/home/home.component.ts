import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Storage, Auth } from 'aws-amplify';

import { FeedService } from '../../core/http/feed.service';
import { PostService } from '../../core/http/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  route = 'Test';
  items = [];
  featuredImageUrl = '';
  profileImageUrl = '';
  profileUsername = '';
  profileName = '';

  content = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedService,
    private postService: PostService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.url.join();

    this.feedService.getData().subscribe(data => {
      this.items = data['feed'];
      console.log(data['feed']);
    });

    Storage.get('pics/featured.jpg', { level: 'private' }).then(data => {
      console.log(data);
      this.featuredImageUrl = JSON.stringify(data);
    });

    Storage.get('pics/profile.png', { level: 'private' }).then(data => {
      console.log(data);
      this.profileImageUrl = JSON.stringify(data); //this.sanitizer.bypassSecurityTrustUrl(data);
    });

    Auth.currentAuthenticatedUser()
      .then(user => {
        this.profileUsername = user.username;
        this.profileName = user.attributes.name;
      })
      .catch(err => console.log(err));
  }

  createPost() {
    console.log(this.content);
    this.postService.createPost(this.content).subscribe(res => {
      this.feedService.getData().subscribe(data => {
        this.content = '';
        this.items.unshift(data['feed'][0]);
        console.log(this.items);
      });
    });
  }
}
