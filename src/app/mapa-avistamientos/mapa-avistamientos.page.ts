import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { CrudespeciesService } from '../services/crudespecies.service';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


declare var google;

@Component({
  selector: 'app-mapa-avistamientos',
  templateUrl: './mapa-avistamientos.page.html',
  styleUrls: ['./mapa-avistamientos.page.scss'],
})
export class MapaAvistamientosPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;
  coords: string;

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

  items: Array<any>;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public crudService: CrudespeciesService
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.firestore.collection(`avistamientos`).valueChanges().subscribe(data => {
      if (data) {
        this.items = data;
        this.loadMap();
      }
    })
  }

  loadMap() {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    });
  }

  setMarkers() {
    let markers = [
      {
        center: { lat: 14.597809004025407, lng: -90.51151901834389 },
        radius: 2
      },
      {
        center: { lat: 14.200009004025407, lng: -90.41151901834389 },
        radius: 2
      },
      {
        center: { lat: 14.300009004025407, lng: -90.01151901834389 },
        radius: 2
      },
      {
        center: { lat: 14.800009004025407, lng: -90.71151901834389 },
        radius: 2
      }
    ];

    for (let item of this.items) {
      let avistamiento = {
        nombre: item.nombre,
        center: { lat: item.latitude, lng: item.longitude },
        radius: 2
      };
      markers.push(avistamiento);
    }

    for (let m of markers) {
      // Add the circle for this city to the map.

      let randomColor = '#FF0000'
      let iconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      if (Math.random() > 0.7) {
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
        center: m.center,
        radius: m.radius * 1000
      });

      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Ocelotes</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Avistamientos:</b> 24<br>Son salvajes, proceder con cuidado.' +
        '</div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(m.center.lat, m.center.lng),
        map: this.map,
        icon: iconURL,
        title: 'Hello World!'
      });

      marker.addListener('click', function () {
        infowindow.open(this.map, marker);
      });
    }
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Dirección no disponible.";
      });
  }
}
