import { Component, OnInit } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  items: Array<any>;

  public goalList: any[];
  public loadedGoalList: any[];



  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.firestore.collection(`especies`).valueChanges().subscribe(goalList => {
    this.goalList = goalList;
    this.loadedGoalList = goalList;
    });
    if (this.route && this.route.data){
      this.getData();
    }
  }

  initializeItems(): void {
    this.goalList = this.loadedGoalList;
    }

    filterList(evt) {
      this.initializeItems();
      const searchTerm = evt.srcElement.value;

      if (!searchTerm) {
      return;
      }
      this.goalList = this.goalList.filter(currentGoal => {
      if (currentGoal.goalName && searchTerm) {
      if (currentGoal.goalName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      return true;
      }
      return false;
      }
      });
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
