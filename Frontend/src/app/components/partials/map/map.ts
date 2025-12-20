import { Component, ElementRef, ViewChild } from '@angular/core';
import { LatLngTuple, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

  private readonly DEFAULT_LATLNG: LatLngTuple =[13.75, 21.62];
  @ViewChild('map',{static:true})
  mapRef!:ElementRef;
  map!:any;
  constructor(){

  }

  ngOnInit(): void{
    this.initializeMap();

  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 6);

    
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(this.map);
  }

  findMyLocation(){
    
  }

}
