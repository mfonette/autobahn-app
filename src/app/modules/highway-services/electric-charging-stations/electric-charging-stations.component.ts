import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ColumnDefinition } from 'src/app/shared/column-definition';
import { AutobahnService } from 'src/app/shared/services/autobahn.service';
import { HigwayService } from 'src/app/shared/services/higway.service';
@Component({
  selector: 'app-electric-charging-stations',
  templateUrl: './electric-charging-stations.component.html',
  styleUrls: ['./electric-charging-stations.component.css']
})
export class ElectricChargingStationsComponent implements OnInit {
  isLoading = true;
  highwayId!: any;
  electricChargingStationData!: any// Populate this with actual data
  private subscription: Subscription = new Subscription();
  columns: ColumnDefinition[] = [
    { header: 'Highway', dataKey: 'title' },
    { header: 'Title', dataKey: 'subTitle' }
  ];
  
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private highwayService: HigwayService,
    private activatedRoute: ActivatedRoute,
    private autobahnService: AutobahnService,
    ) { 
      this.fetchInitialData();
    }

    ngOnInit() {
      this.highwayService.selectedHighway$.subscribe(highway => {
        if (highway) {
          console.log(highway)
          this.fetchData(highway);
        }
      });

      const serviceType = this.activatedRoute.snapshot.routeConfig?.path; // This gets 'roadworks' for the roadworks route
      if(serviceType) {
        this.highwayService.changeServiceType(serviceType);
      }
    }

    fetchInitialData() {
      this.highwayService.selectedHighway$.pipe(take(1)).subscribe(highway => {
        this.fetchData(highway);
      });
    }

    fetchData(highway: string) {
      this.isLoading = true;
      this.subscription.add(this.autobahnService.fetchServiceDetails(highway, 'electric_charging_station').subscribe({
        next: (data) => {
          console.log('parking',data)
          this.electricChargingStationData = data.electric_charging_station.map((electricChargingStation: any) => ({
            title: electricChargingStation.title,
            subTitle: electricChargingStation.subtitle
          }));
          this.changeDetectorRefs.detectChanges();
          this.isLoading = false;
        }
      }));
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();  // Unsubscribe when the component is destroyed
    }

onViewDetails(element: any) {
  // Handle the action (e.g., navigate to a detail page or open a modal)
}

}
