import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate() {
    if (!this.cookieService.check('auth')) {
      this.router.navigate['/'];
      return false;
    } else {
      return true;
    }
  }
}
