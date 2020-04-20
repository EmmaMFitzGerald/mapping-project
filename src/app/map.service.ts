import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  public coronaData$: Observable<any>;
  coronaGeoJson: { [x: string]: { properties: any; type: string; geometry: { type: string; coordinates: any[]; }; }; }
  
  constructor(private http: HttpClient) { 
    this.coronaData$ = this.getCoronaData();
    this.coronaData$.subscribe();
  }




  getCoronaData(){
    return forkJoin([this.http.get("./assets/state-data.json"), this.http.get("./assets/corona-data.json")])
     .pipe(
       map(res => {
        let longitude: any

        let latitude: any

        const coronaGeoJson = {}

        res[1].forEach(element => {

          const state = element["state"]

          res[0].forEach(stateData => {
            if (stateData.state === state){
              longitude = stateData.longitude
              latitude = stateData.latitude
            }
          })
          

          coronaGeoJson[res[1].indexOf(element)] = {
            "properties": element,
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [longitude, latitude]
            }

          }
        });
        
        console.log(coronaGeoJson)

        return coronaGeoJson 

        })
    
     );
  }
}
