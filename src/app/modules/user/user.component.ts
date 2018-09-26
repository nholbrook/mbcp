import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  route = 'Test';
  featuredImageUrl = '';
  profileImageUrl = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.url.join();

    Storage.get('pics/featured.jpg', { level: 'private' }).then(data => {
      console.log(data);
      this.featuredImageUrl = JSON.stringify(data);
    });

    Storage.get('pics/profile.png', { level: 'private' }).then(data => {
      console.log(data);
      this.profileImageUrl = JSON.stringify(data);
    });
  }
}
