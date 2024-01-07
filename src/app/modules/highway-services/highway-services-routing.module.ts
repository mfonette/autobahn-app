import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosuresComponent } from './closures/closures.component';
import { ParkingLorriesComponent } from './parking-lorries/parking-lorries.component';
import { RoadworksComponent } from './roadworks/roadworks.component';
import { ElectricChargingStationsComponent } from './electric-charging-stations/electric-charging-stations.component';

const routes: Routes = [
  { path: 'roadworks', component: RoadworksComponent},
  // { path: 'webcams', component: WebcamsComponent },
  { path: 'closures', component: ClosuresComponent },
  // { path: 'warnings', component: WarningsComponent },
  { path: 'parking-lorries', component: ParkingLorriesComponent },
  { path: 'electric-charging-stations', component: ElectricChargingStationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighwayServicesRoutingModule { }
