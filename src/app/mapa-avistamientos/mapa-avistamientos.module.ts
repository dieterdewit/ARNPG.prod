import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapaAvistamientosPage } from './mapa-avistamientos.page';
import { MapaAvistamientosResolver} from "./mapa-avistamientos.resolver";

const routes: Routes = [
  {
    path: '',
    component: MapaAvistamientosPage,
    resolve: {
      data: MapaAvistamientosResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapaAvistamientosPage],
  providers: [
    MapaAvistamientosResolver
  ]
})
export class MapaAvistamientosPageModule {}
