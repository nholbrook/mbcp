import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  gender: string;
  birthdate: string;
  phoneNumber: string;

  ngOnInit() {}

  signup() {
    this.authService.signup(
      'kgordon',
      this.password,
      this.email,
      this.firstName + ' ' + this.lastName,
      '30000000-0000-0000-0000-000000000000',
      'female',
      '12-03-1998',
      '+17346242417'
    );
  }
}
