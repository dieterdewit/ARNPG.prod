import { Component, OnInit } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  items: Array<any>;



  constructor(
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data){
      this.getData();
    }
  }

  async getData(){
    //const loading = await this.loadingCtrl.create({
      //message: 'Please wait...'
    //});
    //this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        this.items = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
