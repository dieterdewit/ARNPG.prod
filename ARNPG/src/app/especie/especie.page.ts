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
    else{
      console.log("no data");
    }
    })
  }

}


