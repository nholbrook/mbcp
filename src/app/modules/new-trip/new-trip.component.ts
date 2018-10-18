import { Component, OnInit } from '@angular/core';

import { Storage, Auth } from 'aws-amplify';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
  content = '';

  constructor() {}

  ngOnInit() {}

  fileChange($event) {
    console.log($event);
  }
}
