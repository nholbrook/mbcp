import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';

import { AmplifyAngularModule } from 'aws-amplify-angular';

@NgModule({
  imports: [CommonModule, FormsModule, AmplifyAngularModule],
  declarations: [HomeComponent, TripCardComponent, PostCardComponent]
})
export class HomeModule {}
