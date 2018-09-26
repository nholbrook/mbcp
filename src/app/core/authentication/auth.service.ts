import { Injectable } from '@angular/core';

import { AmplifyService } from 'aws-amplify-angular';
import { Storage } from 'aws-amplify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private amplify: AmplifyService) {}

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

  logout() {}

  login() {}

  signup() {}
}
