import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: '', 
    loadChildren: './dashboard/dashboard.module#DashboardPageModule' 
  },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' 
  },
  { 
    path: 'register', 
    loadChildren: './register/register.module#RegisterPageModule' 
  },
  { 
    path: 'dashboard', 
    loadChildren: './dashboard/dashboard.module#DashboardPageModule' 
  },
  //{ path: 'menu', loadChildren: './menu/menu.module#MenuPageModule'},

  //{ path: '', loadChildren: './menu/menu.module#MenuPageModule'},
  { 
    path: 'especie/:id', 
    loadChildren: './especie/especie.module#EspeciePageModule' 
  },
  { 
    path: 'ingresar-especie', 
    loadChildren: './ingresar-especie/ingresar-especie.module#IngresarEspeciePageModule' 
  },
  { 
    path: 'actualizar-especie', 
    loadChildren: './actualizar-especie/actualizar-especie.module#ActualizarEspeciePageModule' 
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
