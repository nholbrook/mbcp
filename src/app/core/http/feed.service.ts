import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../authentication/auth.service';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class FeedService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  getData() {
    return this.http.get(
      'https://api.mbcp.xyz/feed?id=' + this.cookieService.get('id')
    );
  }
}
