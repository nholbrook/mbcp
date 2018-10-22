import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UserComponent } from '../modules/user/user.component';
import { HomeComponent } from '../modules/home/home.component';
import { LoginComponent } from '../modules/login/login.component';
import { ContentComponent } from '../modules/content/content.component';
import { NewTripComponent } from '../modules/new-trip/new-trip.component';

import { AuthGuard } from './guards/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'MBCP | Login' }
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: { title: 'MBCP | Home' }
  },
  {
    path: 'content/:id',
    canActivate: [AuthGuard],
    component: ContentComponent,
    data: { title: 'MBCP | :id' }
  },
  {
    path: 'user/:id',
    canActivate: [AuthGuard],
    component: UserComponent,
    data: { title: 'MBCP | :id' }
  },
  {
    path: 'new-trip',
    canActivate: [AuthGuard],
    component: NewTripComponent,
    data: { title: 'MBCP | New Trip' }
  },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

/*

home

user/:id
profile
settings

orginization/:id

trip/:id
mytrips
feed

login
signup

trip/:id/register
trip/:id/edit
trip/create

 */
