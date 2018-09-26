import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';

import { AmplifyAngularModule } from 'aws-amplify-angular';

@NgModule({
  imports: [CommonModule, AmplifyAngularModule],
  declarations: [UserComponent],
  providers: []
})
export class UserModule {}
