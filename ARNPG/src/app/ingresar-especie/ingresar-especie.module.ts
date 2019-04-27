import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngresarEspeciePage } from './ingresar-especie.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarEspeciePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IngresarEspeciePage]
})
export class IngresarEspeciePageModule {}
