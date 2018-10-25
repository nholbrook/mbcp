import { Injectable } from '@angular/core';

import { AmplifyService } from 'aws-amplify-angular';
import { Storage, Auth } from 'aws-amplify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(
    private amplify: AmplifyService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  authState: string;

  init() {
    this.amplify.authStateChange$.subscribe(authState => {
      this.authState = authState.state;
    });
  }

  login(username: string, password: string) {
    Auth.signIn(username, password)
      .then(user => {
        this.cookieService.set('username', user['username']);
        this.cookieService.set(
          'auth',
          user['signInUserSession']['accessToken']['jwtToken']
        );
        Auth.currentAuthenticatedUser().then(user => {
          this.cookieService.set('username', user.username);
          this.cookieService.set('name', user.attributes.name);
          this.cookieService.set('id', user.attributes['custom:id']);
          this.cookieService.set('email', user.attributes.email);
          this.router.navigate(['/home']);
        });
      })
      .catch(err => console.log(err));
  }

  logout() {
    Auth.signOut()
      .then(data => {
        this.cookieService.delete('auth');
        this.cookieService.delete('username');
        this.cookieService.delete('name');
        this.cookieService.delete('id');
        this.cookieService.delete('email');
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }

  signup(
    username: string,
    password: string,
    email: string,
    name: string,
    id: string,
    gender: string,
    birthdate: string,
    phone_number: string
  ) {
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        name: name,
        'custom:id': id,
        gender: gender,
        birthdate: birthdate, //12-03-1998
        phone_number: phone_number //+17346242417
      },
      validationData: []
    })
      .then(data => {
        /*Auth.verifyCurrentUserAttribute(attr)
          .then(() => {
            console.log('a verification code is sent');
          })
          .catch(e => {
            console.log('failed with error', e);
          });*/
        this.router.navigate(['/home']);
      })
      .catch(err => console.log(err));
  }

  /*profilePicChange(): Observable<any> {
    return this.amplify.authStateChange$.pipe(
      map(authState => {
        console.log('pic' + authState);
        if (!authState.user) {
          return null;
        } else {
          console.log(this.signedIn);
          if (this.signedIn) {
            Storage.get('pics/profile_pic.jpg', { level: 'private' })
              .then(result => {
                return result.toString();
              })
              .catch(err => console.log(err));
          }
        }
      })
    );
  }*/
}
