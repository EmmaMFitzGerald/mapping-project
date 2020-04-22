import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../map.service';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  @ViewChild("map", { static: true }) mapElement: ElementRef;

  totalDeaths: number = 0;
  totalCases: number = 0
  date

  constructor(private mapService: MapService) {};
   
  filterDate(){
    const element = event.currentTarget as unknown as HTMLInputElement
    const date = element.value
    this.mapService.setDateToFilter(date);
    const formattedDate = new Date(((((parseInt(date)*1000)*60)*60)*24))
    this.date = formattedDate.toDateString()
  }

  ngOnInit(): void {
    this.mapService.coronaData$.subscribe((val: any) => { 
     if(val !== undefined){
       this.mapService.initialize(this.mapElement) 
        console.log(this.mapElement)
      } else {
        this.mapService.initialize(this.mapElement) 
        console.log(this.mapElement)
      }
    })

    this.mapService.selectedDateData$.subscribe((val: any) => {
      // val should have totalDeaths property
      console.log("val:", val);
      this.totalDeaths = val.totalDeaths.toLocaleString()
      this.totalCases = val.totalCases.toLocaleString()
    })
    const formattedDate = new Date(((((18283)*1000)*60)*60)*24)
    this.date = formattedDate.toDateString()
  }
  }