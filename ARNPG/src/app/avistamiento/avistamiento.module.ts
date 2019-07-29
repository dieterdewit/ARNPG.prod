import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvistamientoPage } from './avistamiento.page';
import { AvistamientoResolver } from './avistamiento.resolver';

const routes: Routes = [
  {
    path: '',
    component: AvistamientoPage,
    resolve: {
      data: AvistamientoResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvistamientoPage],
  providers:[
    AvistamientoResolver
  ]
})
export class AvistamientoPageModule {}
