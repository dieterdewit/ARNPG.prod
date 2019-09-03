import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapaAvistamientosPage } from './mapa-avistamientos.page';

const routes: Routes = [
  {
    path: '',
    component: MapaAvistamientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapaAvistamientosPage]
})
export class MapaAvistamientosPageModule {}
