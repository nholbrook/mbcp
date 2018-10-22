import { Component, OnInit } from '@angular/core';

import { Auth } from 'aws-amplify';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  ngOnInit() {}

  signUp() {
    Auth.signUp({
      username: 'lcervates',
      password: 'PSW4_test$$$',
      attributes: {
        email: 'ndh175@gmail.com',
        name: 'Luis Cervates',
        'custom:id': '20000000-0000-0000-0000-000000000000'
      },
      validationData: []
    })
      .then(data => console.log(data['pool']))
      .catch(err => console.log(err));
  }
}
