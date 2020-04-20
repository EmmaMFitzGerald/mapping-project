import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  ngOnInit(): void {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW1maXR6Z2VyYWxkIiwiYSI6ImNrOTA5bmFiOTIxcXAzZnFxdWt1OXJ6d3YifQ.fOuVi7c-DSQIGwXyrqb8ZQ';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [-98, 38]
    });

    // this.mapService.getCoronaData()
    //   .subscribe(res => this.data = res)

    // this.mapService.getCoronaData()
    // .subscribe(res => {
    //   this.data = res as string[];
    //   console.log(this.data)
    // })
    
}}
