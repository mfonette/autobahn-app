import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
  ]
})
export class SharedModule { }
