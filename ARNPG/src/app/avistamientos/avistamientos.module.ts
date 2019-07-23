import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvistamientosPage } from './avistamientos.page';

const routes: Routes = [
  {
    path: '',
    component: AvistamientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvistamientosPage]
})
export class AvistamientosPageModule {}
