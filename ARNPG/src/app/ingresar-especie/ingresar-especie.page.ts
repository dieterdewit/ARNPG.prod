import { Component, OnInit } from '@angular/core';

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
@Component({
  selector: 'app-ingresar-especie',
  templateUrl: './ingresar-especie.page.html',
  styleUrls: ['./ingresar-especie.page.scss'],
})
export class IngresarEspeciePage implements OnInit {

  userEmail: string;

  validations_form: FormGroup;
  image: any;
  fileToUp:File;


  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl:ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private webview: WebView,
    private navCtrl: NavController,
    private crudService: CrudespeciesService,
    private authService: AuthenticateService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit() {
    this.image = "./assets/imgs.deafault_image.jpg";
    this.validations_form = this.formBuilder.group({
      familia: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      especie: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      cites: new FormControl('', Validators.required),
      lea: new FormControl('', Validators.required),
      uicn: new FormControl('', Validators.required),
      distEstacional: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      ecologia: new FormControl('', Validators.required),
      habitat: new FormControl('', Validators.required),
      distribucion: new FormControl('', Validators.required),
    });
  }



  onSubmit(value){
    let image_src = this.image;
    let randomId = Math.random().toString(36).substr(2, 5);
    //uploads img to firebase storage
    this.storage.upload(randomId, this.fileToUp).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        this.image=url.toString();
        let data = {
          familia: value.familia,
          genero: value.genero,
          especie: value.especie,
          nombre: value.nombre,
          cites: value.cites,
          lea: value.lea,
          uicn: value.uicn,
          distEstacional: value.distEstacional,
          descripcion: value.descripcion,
          ecologia: value.ecologia,
          habitat: value.habitat,
          distribucion: value.distribucion,
          imagen: this.image
        }
        this.crudService.createEspecie(data)
        .then(
          res => {
            this.router.navigate(["/catalogo"]);
          }
        )
      })
    })

  }

  

  uploadImageToFirebase(){
    console.log("Inicio de subida de imagen");
    let image_src = this.image;
    let randomId = Math.random().toString(36).substr(2, 5);
    console.log(randomId);  
    //uploads img to firebase storage
    this.storage.upload(randomId, this.fileToUp).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        this.image=url.toString();
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
  private delay(ms: number)
  {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

  onFileSelected(event){
    var Imagefile=event.target.files[0];
    var reader = new FileReader();
    this.fileToUp=Imagefile;
    reader.onload = e => this.image = String(reader.result);
    reader.readAsDataURL(Imagefile);
  }

}
