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

  signedIn: boolean;
  profileUsername: string;
  profileName: string;
  profileId: string;

  profilePicChange(): Observable<any> {
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
  }

  logout() {
    Auth.signOut()
      .then(data => {
        this.cookieService.delete('auth');
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }

  login(username: string, password: string) {
    Auth.signIn(username, password)
      .then(user => {
        Auth.currentAuthenticatedUser()
          .then(user => {
            this.cookieService.set('auth', user['signInUserSession']['accessToken']['jwtToken']);
            this.router.navigate(['/home']);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  signup(username: string, password: string, email: string, name: string, id: string) {
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        name: name,
        'custom:id': id
      },
      validationData: []
    })
      .then(data => console.log(data['pool']))
      .catch(err => console.log(err));
  }
}
