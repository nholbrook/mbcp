import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { AmplifyAngularModule } from 'aws-amplify-angular';

@NgModule({
  imports: [CommonModule, AmplifyAngularModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
