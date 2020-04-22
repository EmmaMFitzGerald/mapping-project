import { Injectable, ElementRef } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';

declare let mapboxgl:any;

@Injectable({
  providedIn: "root",
})
export class MapService {
  coronaData$ = new BehaviorSubject<any>(undefined);

  selectedDateData$ = new Subject<any>();

  constructor(private http: HttpClient) { 
    this.getCoronaData();
  }

  public map:any

  setDateToFilter(numberDate: string) {
    this.map.setFilter('cases', ['==', ['number', ['get', 'numberDate']], parseInt(numberDate)]);
    this.map.setFilter('deaths', ['==', ['number', ['get', 'numberDate']], parseInt(numberDate)]);

    // Tell subsscirbers to selectedDateData$ the total to date
    this.selectedDateData$.next({
      totalDeaths: this.updateDeath(parseInt(numberDate)),
      totalCases: this.updateCase(parseInt(numberDate))
    });

  }

  getCoronaData(){
   return this.http.get("../assets/corona-geojson.geojson")
      .subscribe((originalData: any) => {

        console.log("OriginalData is", originalData);

        // Set the replay subject to the originalData value
        this.coronaData$.next(originalData);
      });
  }

  updateDeath(numberDate: number) {

    const coronaData = this.coronaData$.getValue();

        let total = [];

        let array = coronaData["features"]

        array.forEach(element => {
          if (element.properties.numberDate === numberDate){
            if (element.properties.deaths !== 0){
            total.push(element.properties.deaths)
          }}
        })

        let newTotal = 0

        for(let i=0; i < total.length; i++){
          newTotal = newTotal + Number(total[i]);
        }
        return newTotal; // = this.selectedDateData
  }

  updateCase(numberDate: number) {

    const coronaData = this.coronaData$.getValue();

        let total = [];

        let array = coronaData["features"]

        console.log(array)

        array.forEach(element => {
          if (element.properties.numberDate === numberDate){
            if (element.properties.cases !== 0){
            total.push(element.properties.cases)
          }}
        })

        let newTotal = 0

        for(let i=0; i < total.length; i++){
          newTotal = newTotal + Number(total[i]);
        }
        console.log("case total", total)
        console.log("total cases:", newTotal)
        return newTotal; // = this.selectedDateData$
  
  }


   public initialize(containerElement: ElementRef) {

    console.log("containerElement", containerElement.nativeElement)

    const coronaData = this.coronaData$.value;

    console.log("coronaData", coronaData)

    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW1maXR6Z2VyYWxkIiwiYSI6ImNrOTA5bmFiOTIxcXAzZnFxdWt1OXJ6d3YifQ.fOuVi7c-DSQIGwXyrqb8ZQ';
    this.map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [-98, 38]
    });

    this.map.on('style.load', () => {
      console.log("inside map", coronaData)

      this.map.addSource('corona-geojson', {
        type: 'geojson',
        data: coronaData
      });

      this.map.addLayer({
        id: 'cases',
        type: 'circle',
        // source: {
        //   type: 'geojson',
        //   data: coronaData // "../assets/corona-geojson.geojson"
        // },
        source: "corona-geojson",
        filter: ['==', ['number', ['get', 'numberDate']], 18281],
        paint: {
        'circle-color': [
          'step',
          ['get', 'cases'],
          '#4d4dff',
          10,
          '#612dba',
          20,
          "#5a2dba",
          30,
          '#4e2dba',
          40,
          '#452dba',
          50,
          '#392dba',
          100,
          '#2f2dba',
          200,
          '#2d36ba',
          300,
          '#2d3dba',
          400,
          '#0a175c',
          500,
          "#00001a"
          ],
          'circle-radius': [
          'step',
          ['get', "cases"],
          0,
          2,
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
          100,
          17,
          200,
          19,
          300,
          21,
          400,
          23,
          500,
          31
          ],  'circle-opacity': 0.8,
        }
      });

      this.map.addLayer({
        id: 'deaths',
        type: 'circle',
        // source: {
        //   type: 'geojson',
        //   data: coronaData // "../assets/corona-geojson.geojson"
        // },
        source: "corona-geojson",
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
          0,
          1,
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
