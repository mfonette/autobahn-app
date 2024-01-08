import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'highway-info',
    loadChildren: () =>
      import('./modules/highway-services/highway-services.module').then((m) => m.HighwayServicesModule),
  },
  {
    path: 'view-map',
    loadChildren: () =>
      import('./modules/map/map.module').then((m) => m.MapModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
