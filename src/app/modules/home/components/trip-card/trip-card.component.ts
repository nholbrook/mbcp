import { Component, Input, OnInit } from '@angular/core';

import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
  host: { style: 'background-image: #fff' }
})
export class TripCardComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() tripName: string;
  @Input() ownerName: string;
  @Input() ownerImageUrl: string;
  @Input() ownerUsername: string;
  @Input() tripDescription: string;

  likes: number = 0;
  comments: number = 0;

  constructor() {}

  ngOnInit() {
    this.likes = Math.floor(Math.random() * 100) + 1;
    if (this.likes <= 10) {
      this.likes = 0;
    }
    this.comments = Math.floor(Math.random() * 100) + 1;

    Storage.get(this.ownerUsername + '.jpg', { level: 'public' }).then(data => {
      this.ownerImageUrl = JSON.stringify(data);
    });

    Storage.get('dunes.jpg', {
      level: 'public'
    }).then(result => {
      this.imageUrl = JSON.stringify(result);
    });
  }
}
