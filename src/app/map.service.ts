import { Injectable } from '@angular/core';

declare let mapboxgl:any;

@Injectable({
  providedIn: "root",
})
export class MapService {

  public map:any

  setCaseDateToFilter(numberDate){
    this.map.setFilter('cases', ['==', ['number', ['get', 'numberDate']], parseInt(numberDate)]);
  }
  setDeathDateToFilter(numberDate){
    this.map.setFilter('deaths', ['==', ['number', ['get', 'numberDate']], parseInt(numberDate)]);
  }

  async ngOnInit(): Promise<any> {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW1maXR6Z2VyYWxkIiwiYSI6ImNrOTA5bmFiOTIxcXAzZnFxdWt1OXJ6d3YifQ.fOuVi7c-DSQIGwXyrqb8ZQ';
    this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [-98, 38]
    });

    this.map.on('style.load', () => {

      this.map.addLayer({
        id: 'cases',
        type: 'circle',
        source: {
          type: 'geojson',
          data: "../assets/corona-geojson.geojson"
        },
        filter: ['==', ['number', ['get', 'numberDate']], 18281],
        paint: {
        'circle-color': [
          'step',
          ['get', 'cases'],
          '#7FFFD4',
          10,
          '#7FFFD4',
          20,
          "#7FFFD4",
          30,
          '#7FFFD4',
          40,
          '#7FFFD4',
          50,
          '#7FFFD4',
          60,
          '#7FFFD4',
          70,
          '#7FFFD4',
          80,
          '#7FFFD4',
          90,
          '#7FFFD4',
          ],
          'circle-radius': [
          'step',
          ['get', "cases"],
          5,
          10,
          7,
          20,
          9,
          30,
          11,
          40,
          13,
          50,
          15,
          60,
          17,
          70,
          19,
          80,
          21,
          90,
          23,
          100,
          25,
          120,
          27,
          130,
          29,
          140,
          31
          ],  'circle-opacity': 0.65,
        }
      });

      this.map.addLayer({
        id: 'deaths',
        type: 'circle',
        source: {
          type: 'geojson',
          data: "../assets/corona-geojson.geojson"
        },
        filter: ['==', ['number', ['get', 'numberDate']], 18281],
        paint: {
        'circle-color': [
          'step',
          ['get', 'deaths'],
          '#FF0000',
          10,
          '#F80000',
          20,
          "#F00000",
          30,
          "#E80000",
          40,
          "#E80000",
          50,
          "#E00000",
          60,
          "#B80000",
          70,
          "#A80000 ",
          80,
          "#980000",
          90,
          '#880000'
          ],
          'circle-radius': [
          'step',
          ['get', 'deaths'],
          5,
          10,
          7,
          20,
          9,
          30,
          11,
          40,
          13,
          50,
          15,
          60,
          17,
          70,
          19,
          80,
          21,
          90,
          23,
          100,
          25,
          120,
          27,
          130,
          29,
          140,
          31
          ],  'circle-opacity': 0.65,
        }
      });
    })
  }
}
