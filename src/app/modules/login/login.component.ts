import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/authentication/auth.service';

import { Auth } from 'aws-amplify';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private cookieService: CookieService, private authService: AuthService) {}

  ngOnInit() {}

  signup() {
    this.authService.signup(
      'kgordon',
      'PSW4_test$$$',
      'ndh175@gmail.com',
      'Katie Gordon',
      '30000000-0000-0000-0000-000000000000'
    );
  }
}
