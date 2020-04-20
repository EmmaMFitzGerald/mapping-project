import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';

declare let mapboxgl:any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {

  data;

  constructor(private mapService: MapService) { }

async ngOnInit(): Promise<any> {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW1maXR6Z2VyYWxkIiwiYSI6ImNrOTA5bmFiOTIxcXAzZnFxdWt1OXJ6d3YifQ.fOuVi7c-DSQIGwXyrqb8ZQ';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [-98, 38]
    });

    map.on('style.load', function() {

      map.addLayer({
        id: 'coronaData',
        type: 'circle',
        source: {
          type: 'geojson',
          data: "../assets/corona-geojson.geojson" // replace this with the url of your own geojson
        },
        'paint': {
          'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'deaths'],
          6,
          '#FCA107',
          8,
          '#7F3121'
          ],

      }
    })
})}}
