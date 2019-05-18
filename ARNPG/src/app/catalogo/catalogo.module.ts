import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatalogoPage } from './catalogo.page';
import { CatalogoResolver} from "./catalogo.resolver"


const routes: Routes = [
  {
    path: '',
    component: CatalogoPage,
    resolve: {
      data: CatalogoResolver
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
  declarations: [CatalogoPage],
  providers: [
    CatalogoResolver
  ]
})
export class CatalogoPageModule {}
