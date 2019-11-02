import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { CrudespeciesService } from '../services/crudespecies.service';
import { AuthenticateService } from '../services/authentication.service';

import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from "@ionic-native/file/ngx";
import 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { storage } from 'firebase';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';

declare var google;

@Component({
  selector: 'app-notificar-avistamiento',
  templateUrl: './notificar-avistamiento.page.html',
  styleUrls: ['./notificar-avistamiento.page.scss'],
})
export class NotificarAvistamientoPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;
  latitude: string;
  longitude: string;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  userEmail: string;

  validations_form: FormGroup;
  image: any;
  fileToUp: File;


  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private webview: WebView,
    private navCtrl: NavController,
    private crudService: CrudespeciesService,
    private authService: AuthenticateService,
    private storage: AngularFireStorage,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {
    this.image = "./assets/icon/image_upload.svg";
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      fecha: new FormControl(new Date().toLocaleString(), Validators.required),
      comentario: new FormControl('', Validators.required),
      especie: new FormControl('', Validators.required),
      latitude: new FormControl(this.latitude, Validators.required),
      longitude: new FormControl(this.latitude, Validators.required)
    });
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      var simpleLayer = new TileLayer({
        source: new OSM()
      })

      var map = new Map({
        layers: [simpleLayer],
        target: document.getElementById('map'),
        controls: defaultControls().extend([
          new FullScreen()
        ]),
        interactions: defaultInteractions().extend([
          new DragRotateAndZoom()
        ]),
        view: new View({
          center: fromLonLat([resp.coords.longitude, resp.coords.latitude]),
          zoom: 15
        })
      });

      //this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      map.on("moveend", function (e) {
        //this.validations_form.setValue
        //this.getAddressFromCoords(this.map.view.getCenter()[0], this.map.view.getCenter()[1])
        console.log(toLonLat(map.getView().getCenter())[0]);
        this.latitude = toLonLat(map.getView().getCenter())[0];
        this.longitude = toLonLat(map.getView().getCenter())[1];
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
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

  onSubmit(value) {
    let randomId = Math.random().toString(36).substr(2, 5);
    //uploads img to firebase storage
    this.storage.upload(randomId, this.fileToUp).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        this.image = url.toString();
        console.log(this.latitude)
        let data = {
          nombre: value.nombre,
          fecha: value.fecha,
          comentario: value.comentario,
          especie: value.especie,
          latitude: this.latitude,
          longitude: this.longitude,
          revisado: "0",
          multimedia: this.image
        }
        this.crudService.createAvistamiento(data)
          .then(
            res => {
              this.router.navigate(["/dashboard"]);
            }
          )
      })
    })

  }

  uploadImageToFirebase() {
    console.log("Inicio de subida de imagen");
    let image_src = this.image;
    let randomId = Math.random().toString(36).substr(2, 5);
    console.log(randomId);
    //uploads img to firebase storage
    this.storage.upload(randomId, this.fileToUp).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        this.image = url.toString();
        console.log("URL");
        console.log(url);
        console.log("This Image");
        console.log(this.image);
      })
    })
    /*
    this.crudService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
    }, err =>{
      console.log(err);
    });
    console.log("Fin de subida de imagen");
    this.image=randomId;*/
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  async wait() {
    console.log("Beforep: " + new Date().toString());
    // Sleep thread for 3 seconds
    await this.delay(3000);
    console.log("Afterp:  " + new Date().toString());
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onFileSelected(event) {
    var Imagefile = event.target.files[0];
    var reader = new FileReader();
    this.fileToUp = Imagefile;
    reader.onload = e => this.image = String(reader.result);
    reader.readAsDataURL(Imagefile);
  }
}
