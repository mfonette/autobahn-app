import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ColumnDefinition } from 'src/app/shared/column-definition';
import { AutobahnService } from 'src/app/shared/services/autobahn.service';
import { HigwayService } from 'src/app/shared/services/higway.service';

@Component({
  selector: 'app-parking-lorries',
  templateUrl: './parking-lorries.component.html',
  styleUrls: ['./parking-lorries.component.css']
})
export class ParkingLorriesComponent implements OnInit {
  isLoading = true;
  highwayId!: any;
  updatedState!: any;
  parkingLorryData!: any// Populate this with actual data
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
    private router: Router, 
    ) { 
      // this.fetchData('A1')
      this.fetchInitialData();
    }

    ngOnInit() {
      this.highwayService.selectedHighway$.subscribe(highway => {
        if (highway) {
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
      // console.log(highway)
      const baseUrl = 'https://verkehr.autobahn.de/o/autobahn/';
      const url = baseUrl + highway + '/services/parking_lorry';
      this.isLoading = true;
      this.subscription.add(this.autobahnService.fetchServiceDetails(highway, 'parking_lorry').subscribe({
        next: (data) => {
          console.log('parking',data)
          this.parkingLorryData = data.parking_lorry.map((parkingLorry: any) => ({
            title: parkingLorry.title,
            subTitle: parkingLorry.subtitle
          }));
          this.changeDetectorRefs.detectChanges();
          this.isLoading = false;
        }
      }));
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();  // Unsubscribe when the component is destroyed
    }

    navigateToService(serviceName: string) {
      // this.highwayService.setSelectedService(serviceName);
      this.router.navigate([`${serviceName.toLowerCase()}`]);
    }


onViewDetails(element: any) {
  // Handle the action (e.g., navigate to a detail page or open a modal)
}

}
