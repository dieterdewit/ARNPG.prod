import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { DashboardResolver} from "./dashboard.resolver"

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      data: DashboardResolver
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
  declarations: [DashboardPage],
  providers: [
    DashboardResolver
  ]
})
export class DashboardPageModule {}
