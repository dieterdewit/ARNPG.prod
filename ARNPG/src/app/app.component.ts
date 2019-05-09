import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Especies',
      url: '/especie',
      icon: 'bug'
    },
    {
      title: 'Ingresar especie',
      url: '/ingresar-especie',
      icon: 'add-circle'
    },
    {
      title: 'Actualizar especie',
      url: '/actualizar-especie',
      icon: 'create'
    },
    {
      title: 'Iniciar sesión',
      url: '/login',
      icon: 'log-in'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
