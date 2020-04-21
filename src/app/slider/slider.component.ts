import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MapService } from '../map.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {

  @ViewChild('dateSelector') dateSelector: ElementRef;

  
  constructor(private mapService: MapService) {
   }

  filterDate(){
    console.log("filtered")

    const element = event.currentTarget as unknown as HTMLInputElement
    const date = element.value
    console.log("date", date)
    this.mapService.setDateToFilter(date);
  }

  ngOnInit() {
    
  }
}
  





