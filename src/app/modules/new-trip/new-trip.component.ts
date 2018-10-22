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

    //let key = `pics/${file.name}`;

    /*this.amplify
      .storage()
      .put(key, file, {
        level: 'private',
        contentType: file.type
      })
      .then(result => console.log('uploaded: ', result))
      .catch(err => console.log('upload error: ', err));*/
  }
}
