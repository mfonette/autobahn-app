import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighwayServicesRoutingModule } from './highway-services-routing.module';
import { ElectricChargingStationsComponent } from './electric-charging-stations/electric-charging-stations.component';
import { WarningsComponent } from './warnings/warnings.component';
import { ClosuresComponent } from './closures/closures.component';
import { ParkingLorriesComponent } from './parking-lorries/parking-lorries.component';
import { RoadworksComponent } from './roadworks/roadworks.component';


@NgModule({
  declarations: [
    ElectricChargingStationsComponent,
    WarningsComponent,
    ClosuresComponent,
    ParkingLorriesComponent,
    RoadworksComponent
  ],
  imports: [
    CommonModule,
    HighwayServicesRoutingModule
  ]
})
export class HighwayServicesModule { }
