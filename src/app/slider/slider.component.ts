// import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
// import { MapService } from '../map.service';
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-slider',
//   templateUrl: './slider.component.html',
//   styleUrls: ['./slider.component.css'],
// })
// export class SliderComponent implements OnInit {

//   @ViewChild('dateSelector') dateSelector: ElementRef;

  
//   constructor(private mapService: MapService) {
//    }

//   filterDate(){
//     const element = event.currentTarget as unknown as HTMLInputElement
//     const date = element.value
//     this.mapService.setDateToFilter(date);
//     const formattedDate = new Date(((((parseInt(date)*1000)*60)*60)*24))
//     document.getElementById('date').innerHTML = formattedDate.toDateString()
//   }

//   setCasesLayer(){
//     console.log("cases")
//     this.mapService.setCaseLayer();
//   }

//   ngOnInit() {
//     const formattedDate = new Date(((((18283)*1000)*60)*60)*24)
//     document.getElementById('date').innerHTML = formattedDate.toDateString()
//   }
// }
  





