import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  public coronaData$: Observable<any>;
  coronaGeoJson: { [x: string]: { properties: any; type: string; geometry: { type: string; coordinates: any[]; }; }; }
  
  constructor(private http: HttpClient) { 
    this.coronaData$ = this.getCoronaData();
  }

  // getCoronaData(): Observable<any> {
  //   const data = this.http.get("./assets/state-data.json")
  //   .pipe(
  //     switchMap(res => {

  //       console.log("res", res)

  //       this.http.get("./assets/corona-data.json").pipe(
  //         switchMap(data => {
  //           console.log("res2", data)
  //         })
  //       )
  //     })
  //   )
  //   data.subscribe();
  // }  

  getCoronaData(){
    const data = forkJoin([this.http.get("./assets/state-data.json"), this.http.get("./assets/corona-data.json")])
     .pipe(
       map(res => {
        let longitude: any

        let latitude: any

        this.coronaGeoJson = {}

        res[1].forEach(element => {

          const state = element["state"]
          
          res[0].forEach(stateData => {
            if (stateData.state === state){
              longitude = stateData.longitude
              latitude = stateData.latitude
            }
          })
          

          this.coronaGeoJson[res[1].indexOf(element)] = {
            "properties": element,
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [longitude, latitude]
            }

          }
        });
        
        console.log(this.coronaGeoJson)

        return this.coronaGeoJson 

        })
    
     )
    data.subscribe();
  }
}
