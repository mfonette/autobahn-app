import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { DashboardHeaderComponent } from './shared/components/dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './shared/components/dashboard-sidenav/dashboard-sidenav.component';
import { HighwayServicesModule } from './modules/highway-services/highway-services.module';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    // DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    SharedModule,
    // MatTableModule,
    // MatPaginatorModule,
    
    // autobahnApiModule,
    // HighwayServicesModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
