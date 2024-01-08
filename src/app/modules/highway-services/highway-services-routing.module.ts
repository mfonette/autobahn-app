import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosuresComponent } from './closures/closures.component';
import { ParkingLorriesComponent } from './parking-lorries/parking-lorries.component';
import { RoadworksComponent } from './roadworks/roadworks.component';
import { ElectricChargingStationsComponent } from './electric-charging-stations/electric-charging-stations.component';
import { HighwayResetGuard } from '../../shared/highway-reset.guard'; // update with actual path

const routes: Routes = [
  { path: 'roadworks', component: RoadworksComponent, canActivate: [HighwayResetGuard],},
  { path: 'closures', component: ClosuresComponent, canActivate: [HighwayResetGuard], },
  { path: 'parking-lorries', component: ParkingLorriesComponent, canActivate: [HighwayResetGuard], },
  { path: 'electric-charging-stations', component: ElectricChargingStationsComponent, canActivate: [HighwayResetGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighwayServicesRoutingModule { }
