import { Component, Input, OnInit } from '@angular/core';

import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
  host: { style: 'background-image: #fff' }
})
export class PostCardComponent implements OnInit {
  @Input() imageURL: string;
  @Input() ownerName: string;
  @Input() ownerImageUrl: string;
  @Input() ownerUsername: string;
  @Input() content: string;

  likes: number = 0;
  comments: number = 0;

  constructor() {}

  ngOnInit() {
    this.likes = Math.floor(Math.random() * 100) + 1;
    if (this.likes <= 10) {
      this.likes = 0;
    }
    this.comments = Math.floor(Math.random() * 100) + 1;

    Storage.get('profile.png', {
      level: 'public',
      identityId: this.ownerUsername
    }).then(result => {
      this.ownerImageUrl = JSON.stringify(result);
    });
  }
}
