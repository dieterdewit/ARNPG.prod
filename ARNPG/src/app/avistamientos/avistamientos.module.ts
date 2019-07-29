import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvistamientosPage } from './avistamientos.page';
import { AvistamientosResolver} from "./avistamientos.resolver";


const routes: Routes = [
  {
    path: '',
    component: AvistamientosPage,
    resolve: {
      data: AvistamientosResolver
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
  declarations: [AvistamientosPage],
  providers: [
    AvistamientosResolver
  ]
})
export class AvistamientosPageModule {}
