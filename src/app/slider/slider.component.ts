import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../map.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [MapService]
})
export class SliderComponent implements OnInit {

  @ViewChild('dateSelector') dateSelector: ElementRef;

  
  constructor(private mapService: MapService) { }

  ngOnInit() {
    
    // this.createSliderLabel();

  }



  // private createSliderLabel(){
  //   this.mapService.coronaData$
  //   .subscribe(res => {
  //     this.data = res

  //     this.coronaGeoJson = {}

  //     res.forEach(element => {

  //       this.coronaGeoJson[res.indexOf(element)] = {
  //         "properties": element,
  //         "type": "Feature",
  //         "geometry": {
  //           "type": "Point",
  //           "coordinates": [1, 2],
  //         }

  //       }
  //     });
  //     console.log("coronageojson", this.coronaGeoJson)
  //   })
}
  





