import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, ModalController, IonSearchbar } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-avistamientos',
  templateUrl: './avistamientos.page.html',
  styleUrls: ['./avistamientos.page.scss'],
})
export class AvistamientosPage implements OnInit {

  @ViewChild('searchControl') searchControl: IonSearchbar;

  items: Array<any>;
  allItems: Array<any>;

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
    this.firestore.collection(`avistamientos`).valueChanges().subscribe(goalList => {
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

  filterItems(param : any) : void
  {
      let val : string 	= param;
      // DON'T filter the technologies IF the supplied input is an empty string
      if (val.trim() !== '')
      {
        var array = [];
        for (let item of this.allItems) {
          if(item.payload.doc.data().nombre.toLowerCase().indexOf(val.toLowerCase()) > -1){
            array.push(item)
          }
        }
        this.items = array;
      }else{
        this.items = this.allItems
      }
  }

  clearResults() : void{
    this.searchControl.value = '';
  }

  async getData(){
    //const loading = await this.loadingCtrl.create({
      //message: 'Please wait...'
    //});
    //this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        this.items = data;
        this.allItems = this.items.slice(0);
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
