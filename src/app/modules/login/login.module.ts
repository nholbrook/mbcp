import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { AmplifyAngularModule } from 'aws-amplify-angular';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [CommonModule, AmplifyAngularModule, FormsModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
