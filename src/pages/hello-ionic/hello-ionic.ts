import { Component, OnInit } from '@angular/core';

declare const mapboxgl: any;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit {

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibDIxMTA1MjQiLCJhIjoiY2l6MTFjOTV3MDAxbzJ3a2E1MjJrdm4xYyJ9.fDGPLz7xwTULovMwYPheCg';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [-74.50, 40], // starting position
      zoom: 9 // starting zoom
    });
  }
}
