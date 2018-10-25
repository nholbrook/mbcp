import { Component, Input, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
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
  @Input() content: string;
  @Input() ownerUsername: string;
  @Input() createdDate: string;

  ownerImageUrl: string;
  likes: number = 0;
  comments: number = 0;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.likes = Math.floor(Math.random() * 100) + 1;
    if (this.likes <= 10) {
      this.likes = 0;
    }
    this.comments = Math.floor(Math.random() * 100) + 1;

    Storage.get(this.ownerUsername + '.jpg', { level: 'public' }).then(data => {
      this.ownerImageUrl = JSON.stringify(data);
    });
  }

  createTextLinks(text: string) {
    return (text || '').replace(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, function(
      match,
      space,
      url
    ) {
      var hyperlink = url;
      if (!hyperlink.match('^https?://')) {
        hyperlink = 'http://' + hyperlink;
      }
      return space + '<a target="_blank" href="' + hyperlink + '">' + url + '</a>';
    });
  }
}
