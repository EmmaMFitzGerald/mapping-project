import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  
  constructor(private mapService: MapService) {
   }
   
  filterCaseDate(){
    const element = event.currentTarget as unknown as HTMLInputElement
    const date = element.value
    this.mapService.setCaseDateToFilter(date);
    const formattedDate = new Date(((((parseInt(date)*1000)*60)*60)*24))
    document.getElementById('caseDate').innerHTML = formattedDate.toDateString()
  }

  filterDeathDate(){
    const element = event.currentTarget as unknown as HTMLInputElement
    const date = element.value
    this.mapService.setDeathDateToFilter(date);
    const formattedDate = new Date(((((parseInt(date)*1000)*60)*60)*24))
    document.getElementById('deathDate').innerHTML = formattedDate.toDateString()
  }

  ngOnInit(): void {
    this.mapService.ngOnInit();
    const formattedDate = new Date(((((18283)*1000)*60)*60)*24)
    document.getElementById('caseDate').innerHTML = formattedDate.toDateString()
    document.getElementById('deathDate').innerHTML = formattedDate.toDateString()
  }
}