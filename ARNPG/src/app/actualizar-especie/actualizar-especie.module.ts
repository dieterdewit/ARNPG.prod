import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActualizarEspeciePage } from './actualizar-especie.page';
import { ActualizarEspecieResolver } from './actualizar-especie.resolver'

const routes: Routes = [
  {
    path: '',
    component: ActualizarEspeciePage,
    resolve: {
      data: ActualizarEspecieResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActualizarEspeciePage],
  providers: [ActualizarEspecieResolver]
})
export class ActualizarEspeciePageModule {}
