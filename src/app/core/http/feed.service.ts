import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../authentication/auth.service';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getData() {
    return this.http.get('http://34.220.86.249/v1/feed?owner_id=' + this.authService.id);
  }
}
