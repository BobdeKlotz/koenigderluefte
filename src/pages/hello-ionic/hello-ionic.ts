import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import * as mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {

  radius = 150;
  data: any;
  map: any;
  start: any;
  end: any;

  startCoordinate: any;
  endCoordinate: any;

  coords = [{ "latitude": 48.791, "longitude": 8.962, "pollution": 71.16 }, { "latitude": 52.484, "longitude": 13.437, "pollution": 49.07 }, { "latitude": 48.512, "longitude": 9.075, "pollution": 35.14 }, { "latitude": 50.684, "longitude": 13.02, "pollution": 78.86 }, { "latitude": 48.976, "longitude": 9.583, "pollution": 49.78 }, { "latitude": 48.773, "longitude": 9.174, "pollution": 74.14 }, { "latitude": 48.775, "longitude": 9.239, "pollution": 69.08 }, { "latitude": 51.043, "longitude": 13.708, "pollution": 61.93 }, { "latitude": 48.778, "longitude": 9.16, "pollution": 59.99 }, { "latitude": 47.429, "longitude": 8.541, "pollution": 102.78 }, { "latitude": 48.482, "longitude": 9.248, "pollution": 49.81 }, { "latitude": 48.777, "longitude": 9.157, "pollution": 57.74 }, { "latitude": 48.779, "longitude": 9.034, "pollution": 68.15 }, { "latitude": 52.352, "longitude": 14.057, "pollution": 41.41 }, { "latitude": 48.827, "longitude": 9.129, "pollution": 1111.01 }, { "latitude": 53.151, "longitude": 8.231, "pollution": 39.85 }, { "latitude": 53.304, "longitude": 9.815, "pollution": 34.06 }, { "latitude": 48.729, "longitude": 9.119, "pollution": 45.16 }, { "latitude": 48.006, "longitude": 7.828, "pollution": 47.15 }, { "latitude": 48.529, "longitude": 9.06, "pollution": 25.31 }, { "latitude": 47.558, "longitude": 7.602, "pollution": 23.04 }, { "latitude": 49.201, "longitude": 9.242, "pollution": 48.84 }, { "latitude": 48.755, "longitude": 9.295, "pollution": 67.92 }, { "latitude": 48.579, "longitude": 9.179, "pollution": 11670.72 }, { "latitude": 50.074, "longitude": 8.436, "pollution": 50.39 }, { "latitude": 53.888, "longitude": 11.464, "pollution": 35.7 }, { "latitude": 48.751, "longitude": 9.18, "pollution": 37.53 }, { "latitude": 48.702, "longitude": 9.125, "pollution": 69 }, { "latitude": 47.713, "longitude": 7.507, "pollution": 28.65 }, { "latitude": 49.625, "longitude": 9.68, "pollution": 78.87 }, { "latitude": 48.741, "longitude": 9.322, "pollution": 39.71 }, { "latitude": 48.804, "longitude": 9.244, "pollution": 39.45 }, { "latitude": 48.725, "longitude": 9.107, "pollution": 49.35 }, { "latitude": 48.782, "longitude": 9.251, "pollution": 41.91 }, { "latitude": 48.48, "longitude": 9.058, "pollution": 43.34 }, { "latitude": 50.961, "longitude": 7, "pollution": 66.41 }, { "latitude": 48.741, "longitude": 9.317, "pollution": 16.14 }, { "latitude": 48.767, "longitude": 9.175, "pollution": 94.63 }, { "latitude": 46.256, "longitude": 20.146, "pollution": 46.84 }, { "latitude": 48.729, "longitude": 9.337, "pollution": 52.38 }, { "latitude": 48.554, "longitude": 9.294, "pollution": 109.72 }, { "latitude": 51.971, "longitude": 7.625, "pollution": 78.59 }, { "latitude": 53.558, "longitude": 9.97, "pollution": 30.03 }, { "latitude": 48.775, "longitude": 9.151, "pollution": 83.2 }, { "latitude": 48.721, "longitude": 9.267, "pollution": 38.89 }, { "latitude": 51.114, "longitude": 13.78, "pollution": 59.27 }, { "latitude": 49.041, "longitude": 9.136, "pollution": 45.94 }, { "latitude": 48.813, "longitude": 9.142, "pollution": 80.1 }, { "latitude": 53.591, "longitude": 10.004, "pollution": 81.58 }, { "latitude": 48.787, "longitude": 9.192, "pollution": 84.21 }, { "latitude": 48.737, "longitude": 9.228, "pollution": 50 }, { "latitude": 48.722, "longitude": 9.209, "pollution": 89.68 }, { "latitude": 48.585, "longitude": 13.459, "pollution": 25.3 }, { "latitude": 49.097, "longitude": 9.274, "pollution": 43.83 }, { "latitude": 48.791, "longitude": 8.964, "pollution": 67.98 }, { "latitude": 48.648, "longitude": 8.908, "pollution": 37.23 }, { "latitude": 48.752, "longitude": 9.173, "pollution": 74.66 }, { "latitude": 48.786, "longitude": 9.193, "pollution": 102.23 }, { "latitude": 50.652, "longitude": 12.215, "pollution": 135.86 }, { "latitude": 48.755, "longitude": 9.293, "pollution": 69.82 }, { "latitude": 48.536, "longitude": 9.274, "pollution": 89.83 }, { "latitude": 48.764, "longitude": 9.17, "pollution": 29.86 }, { "latitude": 48.775, "longitude": 9.15, "pollution": 38.77 }, { "latitude": 51.668, "longitude": 8.833, "pollution": 96.35 }, { "latitude": 48.49, "longitude": 9.201, "pollution": 41.24 }, { "latitude": 48.606, "longitude": 9.096, "pollution": 41.1 }, { "latitude": 48.787, "longitude": 9.011, "pollution": 76.63 }, { "latitude": 48.182, "longitude": 10.976, "pollution": 176.02 }, { "latitude": 52.38, "longitude": 9.67, "pollution": 59.36 }, { "latitude": 48.806, "longitude": 9.238, "pollution": 77.7 }, { "latitude": 48.736, "longitude": 9.289, "pollution": 43.15 }, { "latitude": 52.54, "longitude": 13.386, "pollution": 39.27 }, { "latitude": 48.542, "longitude": 9.041, "pollution": 46.39 }, { "latitude": 48.765, "longitude": 9.168, "pollution": 60.14 }, { "latitude": 48.931, "longitude": 8.958, "pollution": 87.03 }, { "latitude": 48.135, "longitude": 11.504, "pollution": 38.74 }, { "latitude": 48.321, "longitude": 11.667, "pollution": 5311.21 }, { "latitude": 48.871, "longitude": 9.226, "pollution": 87.16 }, { "latitude": 48.533, "longitude": 9.059, "pollution": 47.49 }, { "latitude": 48.805, "longitude": 9.218, "pollution": 92.75 }, { "latitude": 48.397, "longitude": 9.99, "pollution": 42.88 }, { "latitude": 48.442, "longitude": 9.997, "pollution": 153.05 }, { "latitude": 48.261, "longitude": 10.987, "pollution": 52.08 }, { "latitude": 48.718, "longitude": 9.274, "pollution": 40.58 }, { "latitude": 48.791, "longitude": 9.199, "pollution": 571.13 }, { "latitude": 50.923, "longitude": 11.596, "pollution": 50.71 }, { "latitude": 48.519, "longitude": 9.052, "pollution": 34.79 }, { "latitude": 53.55, "longitude": 9.944, "pollution": 32.18 }, { "latitude": 48.777, "longitude": 9.161, "pollution": 40.72 }, { "latitude": 47.644, "longitude": 7.642, "pollution": 34.11 }, { "latitude": 48.704, "longitude": 9.21, "pollution": 36.54 }, { "latitude": 48.717, "longitude": 9.293, "pollution": 79.29 }, { "latitude": 50.103, "longitude": 8.549, "pollution": 11.94 }, { "latitude": 48.781, "longitude": 9.192, "pollution": 69.2 }, { "latitude": 48.783, "longitude": 9.192, "pollution": 102.85 }, { "latitude": 48.734, "longitude": 9.34, "pollution": 68.52 }, { "latitude": 48.791, "longitude": 9.164, "pollution": 79.97 }, { "latitude": 48.776, "longitude": 9.156, "pollution": 79.32 }, { "latitude": 49.309, "longitude": 8.641, "pollution": 48.43 }, { "latitude": 50.785, "longitude": 6.496, "pollution": 56.13 }, { "latitude": 48.672, "longitude": 9.375, "pollution": 46.34 }, { "latitude": 48.77, "longitude": 9.198, "pollution": 71.96 }, { "latitude": 48.786, "longitude": 9.195, "pollution": 45.13 }, { "latitude": 48.759, "longitude": 9.162, "pollution": 78.33 }, { "latitude": 48.758, "longitude": 9.291, "pollution": 49.38 }, { "latitude": 48.742, "longitude": 9.308, "pollution": 49.98 }, { "latitude": 48.77, "longitude": 9.2, "pollution": 70.69 }, { "latitude": 48.215, "longitude": 10.18, "pollution": 53.61 }, { "latitude": 48.768, "longitude": 9.174, "pollution": 79.27 }, { "latitude": 49.514, "longitude": 8.293, "pollution": 42.22 }, { "latitude": 48.793, "longitude": 9.032, "pollution": 76.4 }, { "latitude": 48.809, "longitude": 9.119, "pollution": 86.2 }, { "latitude": 48.922, "longitude": 12.198, "pollution": 40.83 }, { "latitude": 49.579, "longitude": 11.01, "pollution": 28.89 }, { "latitude": 48.528, "longitude": 9.087, "pollution": 31.89 }, { "latitude": 48.483, "longitude": 9.204, "pollution": 113.63 }, { "latitude": 47.738, "longitude": 9.117, "pollution": 42.72 }, { "latitude": 49.007, "longitude": 12.105, "pollution": 32.99 }, { "latitude": 19.807, "longitude": -70.704, "pollution": 32.36 }, { "latitude": 51.903, "longitude": 9.542, "pollution": 52.92 }, { "latitude": 53.607, "longitude": 10.047, "pollution": 39.35 }, { "latitude": 51.99, "longitude": 8.598, "pollution": 75.63 }, { "latitude": 48.942, "longitude": 9.256, "pollution": 53.12 }, { "latitude": 49.083, "longitude": 9.609, "pollution": 1496.6 }, { "latitude": 48.111, "longitude": 11.581, "pollution": 71.87 }, { "latitude": 48.735, "longitude": 9.332, "pollution": 63.51 }, { "latitude": 48.531, "longitude": 9.2, "pollution": 82.06 }, { "latitude": 48.509, "longitude": 9.052, "pollution": 39.09 }, { "latitude": 53.592, "longitude": 10.044, "pollution": 38.07 }, { "latitude": 48.649, "longitude": 9.47, "pollution": 43.23 }, { "latitude": 48.957, "longitude": 9.437, "pollution": 51.54 }, { "latitude": 48.738, "longitude": 9.23, "pollution": 33.99 }, { "latitude": 48.777, "longitude": 9.235, "pollution": 602.96 }, { "latitude": 48.523, "longitude": 8.927, "pollution": 43.58 }, { "latitude": 46.317, "longitude": 19.918, "pollution": 53 }, { "latitude": 47.386, "longitude": 8.54, "pollution": 53.88 }, { "latitude": 48.884, "longitude": 9.191, "pollution": 30.68 }, { "latitude": 48.771, "longitude": 9.212, "pollution": 75.2 }, { "latitude": 48.767, "longitude": 9.177, "pollution": 44.38 }, { "latitude": 48.776, "longitude": 9.143, "pollution": 97.04 }, { "latitude": 51.634, "longitude": 7.112, "pollution": 118.57 }, { "latitude": 48.093, "longitude": 11.613, "pollution": 69.37 }, { "latitude": 52.038, "longitude": 8.533, "pollution": 51.21 }, { "latitude": 48.696, "longitude": 9.504, "pollution": 58.01 }, { "latitude": 48.56, "longitude": 9.207, "pollution": 101.26 }, { "latitude": 48.8, "longitude": 9.003, "pollution": 56.57 }, { "latitude": 48.771, "longitude": 9.146, "pollution": 78 }, { "latitude": 51.093, "longitude": 17.002, "pollution": 14.09 }, { "latitude": 48.827, "longitude": 9.126, "pollution": 89.48 }, { "latitude": 48.778, "longitude": 9.189, "pollution": 73.31 }, { "latitude": 48.391, "longitude": 9.95, "pollution": 53.95 }, { "latitude": 48.809, "longitude": 9.18, "pollution": 107.91 }, { "latitude": 48.724, "longitude": 9.094, "pollution": 41.95 }, { "latitude": 48.5, "longitude": 9.172, "pollution": 53.83 }, { "latitude": 48.784, "longitude": 9.207, "pollution": 86.37 }, { "latitude": 48.779, "longitude": 9.16, "pollution": 55.66 }, { "latitude": 47.371, "longitude": 8.524, "pollution": 48.4 }, { "latitude": 48.807, "longitude": 9.246, "pollution": 39.98 }, { "latitude": 48.804, "longitude": 9.534, "pollution": 37.09 }, { "latitude": 51.476, "longitude": 7.429, "pollution": 78.6 }, { "latitude": 48.791, "longitude": 8.989, "pollution": 95.6 }, { "latitude": 48.806, "longitude": 9.22, "pollution": 1618.54 }, { "latitude": 48.769, "longitude": 9.185, "pollution": 38.23 }, { "latitude": 53.448, "longitude": 10.227, "pollution": 32.39 }, { "latitude": 51.476, "longitude": 7.232, "pollution": 159.52 }, { "latitude": 51.498, "longitude": 7.243, "pollution": 137.76 }, { "latitude": 48.775, "longitude": 9.162, "pollution": 55.17 }, { "latitude": 48.747, "longitude": 9.326, "pollution": 79.47 }, { "latitude": 48.806, "longitude": 9.219, "pollution": 45.86 }, { "latitude": 54.085, "longitude": 12.127, "pollution": 28.74 }, { "latitude": 48.685, "longitude": 9.005, "pollution": 49.61 }, { "latitude": 51.014, "longitude": 14.929, "pollution": 18516.76 }, { "latitude": 48.8, "longitude": 9.216, "pollution": 64.15 }, { "latitude": 48.765, "longitude": 9.172, "pollution": 36.77 }];

constructor(private http: Http) { }

ngOnInit() {
  var token = 'pk.eyJ1IjoibDIxMTA1MjQiLCJhIjoiY2l6MTFjOTV3MDAxbzJ3a2E1MjJrdm4xYyJ9.fDGPLz7xwTULovMwYPheCg';

  this.map = L.map('map').setView([49.445591, 11.074339], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: token
  }).addTo(this.map);

  this.drawDEATH();
}

go() {
  this.getStart();
}


getStart() {
  if (!this.start) return;
  this.http.get(`https://graphhopper.com/api/1/geocode?q=${this.start}&locale=de&key=14be7024-59f0-42df-baec-9ab54614d2c6`)
    .subscribe(
    result => {
      let point = result.json().hits[0].point;
      this.startCoordinate = point.lat + "," + point.lng;
      this.getEnd();
    }
    );
}

getEnd() {
  if (!this.end) return;
  this.http.get(`https://graphhopper.com/api/1/geocode?q=${this.end}&locale=de&key=14be7024-59f0-42df-baec-9ab54614d2c6`)
    .subscribe(
    result => {
      let point = result.json().hits[0].point;
      this.endCoordinate = point.lat + "," + point.lng;
      this.getPaths('bike', 'green', true);
      this.getPaths('car', 'red', true);
    });
}

getPaths(vehicle, color, withBlocking) {
  let block_areas = '';
  if (withBlocking) {
    block_areas += '&block_area=';
    let first = true;
    this.coords.forEach(area => {
      block_areas += (!first ? ';' : '') + area.latitude + ',' + area.longitude + ',' + this.radius
      first = false
    });
  }
  this.http.get(`http://46.4.67.134:8989/route/?point=${this.startCoordinate}&point=${this.endCoordinate}&locale=de&vehicle=${vehicle}&elevation=false&use_miles=false&points_encoded=false&layer=OpenStreetMap` + block_areas)
    .subscribe(
    result => {
      this.data = result.json();
      this.drawPaths(color);
    });
}

drawPaths(color) {
  this.data.paths.forEach(path => {
    console.log(path);
    path.points.coordinates.map((c) => { return c.reverse(); });
    var polyline = L.polyline(path.points.coordinates, { color: color }).addTo(this.map);
    this.map.fitBounds(polyline.getBounds());
  });
}

drawDEATH() {
  this.coords.forEach(element => {
    L.circle([element.latitude, element.longitude], {
      color: '#666',
      fillColor: '#F33',
      fillOpacity: 0.5,
      radius: this.radius
    }).addTo(this.map);
  });
}

}
