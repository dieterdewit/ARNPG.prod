import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-mapa-avistamientos',
  templateUrl: './mapa-avistamientos.page.html',
  styleUrls: ['./mapa-avistamientos.page.scss'],
})
export class MapaAvistamientosPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;
  coords:string;

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.coords = "Lat: " + this.map.center.lat() + " Long: " + this.map.center.lng();
      });

      this.setMarkers(latLng);
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  setMarkers(latLng){
    let areas = {
      animal1: {
        center: {lat: 14.597809004025407, lng: -90.51151901834389},
        radius: 2
      },
      animal2: {
        center: {lat: 14.200009004025407, lng: -90.41151901834389},
        radius: 2
      },
      animal3: {
        center: {lat: 14.300009004025407, lng: -90.01151901834389},
        radius: 2
      },
      animal4: {
        center: {lat: 14.800009004025407, lng: -90.71151901834389},
        radius: 2
      }
    };

    for (var area in areas) {
      // Add the circle for this city to the map.

      let randomColor = '#FF0000'
      let iconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      if(Math.random()> 0.7){
        randomColor = '#FFFF00'
        iconURL = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      }

      let cityCircle = new google.maps.Circle({
        //strokeColor: '#FF0000',
        strokeColor: randomColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: randomColor,
        fillOpacity: 0.35,
        map: this.map,
        center: areas[area].center,
        radius: areas[area].radius * 1000
      });

      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Ocelotes</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Avistamientos:</b> 24<br>Son salvajes, proceder con cuidado.' +
      '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(areas[area].center.lat, areas[area].center.lng),
        map: this.map,
        icon: iconURL,
        title: 'Hello World!'
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    }
  }
 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Dirección no disponible.";
      });
  }
}
