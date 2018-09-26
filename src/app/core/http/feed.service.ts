import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      'http://34.220.86.249/v1/feed?owner_id=10000000-0000-0000-0000-000000000000'
    );
  }
}
