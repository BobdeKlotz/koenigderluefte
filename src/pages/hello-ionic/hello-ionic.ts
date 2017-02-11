import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {

  ngOnInit() {

    // [11.074339, 49.445591]
    // [49.445591, 11.074339]
    var token = 'pk.eyJ1IjoibDIxMTA1MjQiLCJhIjoiY2l6MTFjOTV3MDAxbzJ3a2E1MjJrdm4xYyJ9.fDGPLz7xwTULovMwYPheCg';

    var mymap = L.map('map').setView([49.445591, 11.074339], 13);
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: token
    }).addTo(mymap);

  }
}
