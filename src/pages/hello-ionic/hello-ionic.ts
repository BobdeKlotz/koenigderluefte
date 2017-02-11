import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import * as mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {

  data: any;
  map: any;

  constructor(private http: Http) { }

  ngOnInit() {

    // [11.074339, 49.445591]
    // [49.445591, 11.074339]
    let coords = [49.445591, 11.074339];

    var token = 'pk.eyJ1IjoibDIxMTA1MjQiLCJhIjoiY2l6MTFjOTV3MDAxbzJ3a2E1MjJrdm4xYyJ9.fDGPLz7xwTULovMwYPheCg';

    this.map = L.map('map').setView([49.445591, 11.074339], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: token
    }).addTo(this.map);

    this.getPaths('49.43801281870582,11.082058846950531', '49.46054878954337,11.092706121853553', 'car', 'red');
    this.getPaths('49.43801281870582,11.082058846950531', '49.46054878954337,11.092706121853553', 'bike', 'green');
  }

  getPaths(start, end, vehicle, color) {
    this.http.get(`http://46.4.67.134:8989/route/?point=${start}&point=${end}&locale=de&vehicle=${vehicle}&elevation=false&use_miles=false&points_encoded=false`)
      .subscribe(
      result => {
        this.data = result.json();
        this.drawPaths(color);
      },
      error => console.log(error),
      () => console.log('completed')
      );
  }

  drawPaths(color) {
    this.data.paths.forEach(path => {
      path.points.coordinates.map((c) => { return c.reverse(); });      
      var polyline = L.polyline(path.points.coordinates, { color: color }).addTo(this.map);
      // zoom the map to the polyline
      this.map.fitBounds(polyline.getBounds());
    });
  }

}
