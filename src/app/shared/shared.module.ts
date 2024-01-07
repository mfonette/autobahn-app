import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    // DashboardHeaderComponent,
    // DashboardSidenavComponent,
    // DataTableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class SharedModule { }
