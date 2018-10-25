import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../core/http/post.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  data: any;
  sub: any;
  imageURL: string;
  tripName: string;
  ownerName: string;
  ownerImageUrl: string;
  ownerUsername: string;
  name: string;
  content: string;

  likes: number = 0;
  comments: number = 0;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.postService.getPost(params['id']).subscribe(data => {
        this.data = JSON.stringify(data);
        this.imageURL = data['feed'][0]['image_url'];
        this.name = data['feed'][0]['name'];
        this.ownerName = data['feed'][0]['owner_name'];
        this.ownerUsername = data['feed'][0]['owner_username'];
        this.content = data['feed'][0]['content'];
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
