import { Component, OnInit } from '@angular/core';

//servicios
import { CrudespeciesService } from '../services/crudespecies.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-especie',
  templateUrl: './especie.page.html',
  styleUrls: ['./especie.page.scss'],
})
export class EspeciePage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  
  constructor(
    public crudService: CrudespeciesService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.getData();
    
  }

  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
    if (data) {
      this.item = data;
      console.log("si data");
      console.log(Object.keys(this.item));
    }
    if (data) {
      this.item = data;

      if(this.item.lea == "1"){
        this.item.lea = "./assets/icon/1_G.png"
      }else if(this.item.lea == "2"){
        this.item.lea = "./assets/icon/2_G.png"
      }else if(this.item.lea == "3"){
        this.item.lea = "./assets/icon/3_G.png"
      }else if (this.item.lea == "X"){
        this.item.lea = "./assets/icon/X_G.png"
      }else{
        this.item.lea = "./assets/icon/-_G.png"
      }

      if(this.item.cites == "I"){
        this.item.cites = "./assets/icon/I_Y.png"
      }else if(this.item.cites == "II"){
        this.item.cites = "./assets/icon/II_Y.png"
      }else if(this.item.cites == "III"){
        this.item.cites = "./assets/icon/III_Y.png"
      }else if (this.item.cites == "X"){
        this.item.cites = "./assets/icon/X_Y.png"
      }else{
        this.item.cites = "./assets/icon/-_Y.png"
      }

      if(this.item.uicn == "LC"){
        this.item.uicn = "./assets/icon/LC.png"
      }else if(this.item.uicn == "VU"){
        this.item.uicn = "./assets/icon/VU.png"
      }else if(this.item.uicn == "EN"){
        this.item.uicn = "./assets/icon/EN.png"
      }else if (this.item.uicn == "CR"){
        this.item.uicn = "./assets/icon/CR.png"
      }else if (this.item.uicn == "DD"){
        this.item.uicn = "./assets/icon/DD.png"
      }else{
        this.item.uicn = "./assets/icon/-_R.png"
      }

      if(this.item.distEstacional == "R"){
        this.item.distEstacional = "./assets/icon/R.png"
      }else if(this.item.distEstacional == "M"){
        this.item.distEstacional = "./assets/icon/M.png"
      }else if(this.item.distEstacional == "T"){
        this.item.distEstacional = "./assets/icon/T.png"
      }else if (this.item.distEstacional == "ER"){
        this.item.distEstacional = "./assets/icon/ER.png"
      }else{
        this.item.distEstacional = "./assets/icon/-_P.png"
      }
    }
    else{
      console.log("no data");
    }
    })
  }

}


