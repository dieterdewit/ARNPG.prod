import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items: Array<any>;


  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    if (this.route && this.route.data) {
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
        //loading.dismiss();
        this.items = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}