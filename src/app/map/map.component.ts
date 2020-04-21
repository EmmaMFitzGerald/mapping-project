import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {
  
  constructor(private mapService: MapService) {
   }
   
  ngOnInit(): void {
    this.mapService.ngOnInit()
  }
}