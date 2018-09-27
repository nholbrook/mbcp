import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { filter } from 'rxjs/operators';

import { Storage, Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';

import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
  styles: [],
  providers: []
})
export class CoreComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private amplify: AmplifyService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.titleService.setTitle(
          this.activatedRoute.root.firstChild.data['_value'].title
        );
      });

    this.amplify.authStateChange$.subscribe(authState => {
      this.auth.signedIn = authState.state === 'signedIn';
    });

    //console.log(JSON.parse(localStorage.getItem('CognitoIdentityServiceProvider.1q049i98vqgtac31h7l4ptkea7.LastAuthUser')));
  }

  onImagePicked(file) {
    const key = `pics/${file.name}`;
    console.log(`${file}`);

    this.amplify
      .storage()
      .put('pics/featured.jpeg', file, {
        level: 'private',
        contentType: file.type
      })
      .then(result => console.log('uploaded: ', result))
      .catch(err => console.log('upload error: ', err));
  }
}
