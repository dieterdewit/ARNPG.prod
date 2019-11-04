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
      title: 'Catálogo de especies',
      url: '/catalogo',
      icon: 'book'
    },
    {
      title: 'Ingresar especie',
      url: '/ingresar-especie',
      icon: 'add-circle'
    },
    {
      title: 'Notificar avistamiento',
      url: '/notificar-avistamiento',
      icon: 'camera'
    },
    {
      title: 'Avistamientos',
      url: '/avistamientos',
      icon: 'images'
    },
    {
      title: 'Mapa avistamientos',
      url: '/mapa-avistamientos',
      icon: 'map'
    },
    {
      title: 'Iniciar sesión',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Sobre nosotros',
      url: '/dashboard',
      icon: 'information'
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
