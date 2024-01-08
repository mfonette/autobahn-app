import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighwayResetGuard } from './shared/highway-reset.guard'; // update with actual path


const routes: Routes = [
  {
    path: 'highway-info',
    // canActivate: [HighwayResetGuard],
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
