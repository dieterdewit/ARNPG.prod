import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EspeciePage } from './especie.page';
import { EspecieResolver } from './especie.resolver';



const routes: Routes = [
  {
    path: '',
    component: EspeciePage,
    resolve: {
      data: EspecieResolver
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
  declarations: [EspeciePage],
  providers:[EspecieResolver]
})
export class EspeciePageModule {}
