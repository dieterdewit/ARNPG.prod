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
        this.item.lea = "1"
      }else if(this.item.lea == "2"){
        this.item.lea = "2"
      }else if(this.item.lea == "3"){
        this.item.lea = "3"
      }else if (this.item.lea == "X"){
        this.item.lea = "X"
      }else{
        this.item.lea = "-"
      }

      if(this.item.cites == "I"){
        this.item.cites = "I"
      }else if(this.item.cites == "II"){
        this.item.cites = "II"
      }else if(this.item.cites == "III"){
        this.item.cites = "III"
      }else if (this.item.cites == "X"){
        this.item.cites = "X"
      }else{
        this.item.cites = "-"
      }

      if(this.item.uicn == "LC"){
        this.item.uicn = "LC"
      }else if(this.item.uicn == "VU"){
        this.item.uicn = "VU"
      }else if(this.item.uicn == "EN"){
        this.item.uicn = "EN"
      }else if (this.item.uicn == "CR"){
        this.item.uicn = "CR"
      }else if (this.item.uicn == "DD"){
        this.item.uicn = "DD"
      }else{
        this.item.uicn = "-"
      }

      if(this.item.distEstacional == "R"){
        this.item.distEstacional = "R"
      }else if(this.item.distEstacional == "M"){
        this.item.distEstacional = "M"
      }else if(this.item.distEstacional == "T"){
        this.item.distEstacional = "T"
      }else if (this.item.distEstacional == "ER"){
        this.item.distEstacional = "ER"
      }else{
        this.item.distEstacional = "-"
      }
    }
    else{
      console.log("no data");
    }
    })
  }

}


