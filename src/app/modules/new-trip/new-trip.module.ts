import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewTripComponent } from './new-trip.component';

import { AmplifyAngularModule } from 'aws-amplify-angular';

@NgModule({
  imports: [CommonModule, AmplifyAngularModule],
  declarations: [NewTripComponent]
})
export class NewTripModule {}
