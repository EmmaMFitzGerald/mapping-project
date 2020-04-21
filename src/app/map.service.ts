import { Injectable } from '@angular/core';

declare let mapboxgl:any;

@Injectable({
  providedIn: "root",
})
export class MapService {

  public map:any

  setDateToFilter(numberDate){
    this.map.setFilter('coronaData', ['==', ['number', ['get', 'numberDate']], parseInt(numberDate)]);
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
        id: 'coronaData',
        type: 'circle',
        source: {
          type: 'geojson',
          data: "../assets/corona-geojson.geojson"
        },
        filter: ['==', ['number', ['get', 'numberDate']], 18282],
        paint: {
        'circle-color': [
          'step',
          ['get', 'deaths'],
          '#51bbd6',
          100,
          '#f1f075',
          200,
          "#001f3f",
          300,
          "#0074D9",
          400,
          "#7FDBFF",
          500,
          "#39CCCC",
          600,
          "#3D9970",
          700,
          "#FFDC00",
          800,
          "#FF851B",
          900,
          '#f28cb1'
          ],
          'circle-radius': [
          'step',
          ['get', 'deaths'],
          5,
          100,
          7,
          200,
          9,
          300,
          11,
          400,
          13,
          500,
          15,
          600,
          17,
          700,
          19,
          800,
          21,
          900,
          23
          ],  'circle-opacity': 0.65,
        }
      });
    })
  }
}
