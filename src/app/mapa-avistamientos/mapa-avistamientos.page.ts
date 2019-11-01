import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { CrudespeciesService } from '../services/crudespecies.service';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';

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
    this.setMarkers();
  }

  setMarkers() {
    let markers = [];

    for (let item of this.items) {
      console.log(item.longitude);
      if (!item.longitude) {
        continue;
      }
      var marker = new Feature({
        geometry: new Point(fromLonLat([item.longitude, item.latitude]))
      });

      marker.setStyle(new Style({
        image: new Icon({
          color: '#FFFFFF',
          crossOrigin: 'anonymous',
          src: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        })
      }));
      markers.push(marker);
    }

    var simpleLayer = new TileLayer({
      source: new OSM()
    })

    var vectorSource = new VectorSource({
      features: markers
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource
    });

    var map = new Map({
      layers: [simpleLayer, vectorLayer],
      target: document.getElementById('map'),
      controls: defaultControls().extend([
        new FullScreen()
      ]),
      interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
      ]),
      view: new View({
        center: fromLonLat([-90.51151901834389, 14.597809004025407]),
        zoom: 8
      })
    });

    for (let m of markers) {
      // Add the circle for this city to the map.

      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Ocelotes</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Avistamientos:</b> 24<br>Son salvajes, proceder con cuidado.' +
        '</div>' +
        '</div>';
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
