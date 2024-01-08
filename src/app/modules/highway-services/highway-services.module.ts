import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighwayServicesRoutingModule } from './highway-services-routing.module';
import { ElectricChargingStationsComponent } from './electric-charging-stations/electric-charging-stations.component';
import { ClosuresComponent } from './closures/closures.component';
import { ParkingLorriesComponent } from './parking-lorries/parking-lorries.component';
import { RoadworksComponent } from './roadworks/roadworks.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ElectricChargingStationsComponent,
    ClosuresComponent,
    ParkingLorriesComponent,
    RoadworksComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    HighwayServicesRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class HighwayServicesModule { }
